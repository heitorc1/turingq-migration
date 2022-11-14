<?php

namespace App\Console\Commands;

use App\Library\RabbitMQ;
use Illuminate\Console\Command;

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
        $this->rabbit->getMessages();
    }
}
