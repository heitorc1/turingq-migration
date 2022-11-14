<?php

namespace App\Console\Commands;

use App\Library\RabbitMQ;
use App\Mail\RelatedQuestion;
use App\Models\Question;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;

class SyncQuestions extends Command
{
    private $rabbit;

    public function __construct(RabbitMQ $rabbit)
    {
        parent::__construct();
        $this->rabbit = $rabbit;
    }
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:questions';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync new questions published in TuringQ and send email to authors of related questions';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $channel = $this->rabbit->getChannel();

        $channel->basic_consume(
            'question.recommendation',
            '',
            false,
            false,
            false,
            false,
            array($this, 'processMessage')
        );

        $this->info('Consuming queue...');

        $channel->consume();
    }

    public function processMessage($message)
    {
        $question = json_decode($message->body)->question;

        $createdQuestion = Question::create([
            'question_id' => $question->id,
            'title' => $question->title,
            'author' => $question->author,
            'author_email' => $question->author_email
        ]);

        $title = $question->title;
        $words = explode(" ", $title);

        $questions = Question::whereNot('id', $createdQuestion->id)
            ->whereNot('author', $createdQuestion->author)
            ->where(function ($query) use ($words) {
                foreach ($words as $word) {
                    $query->orWhere('title', 'like', '%' . $word . '%');
                }
            })
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        if ($questions->isNotEmpty()) {
            Mail::to($question->author_email)->send(
                new RelatedQuestion($questions, $question->author)
            );
        }

        $message->ack();
    }
}
