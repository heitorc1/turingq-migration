<div>
    <p>Hello {{ $name }}!</p>
    <br>
    <p>While you wait for an answer to your question, why don't you take a look at these similiar questions?</p>

    @foreach ($questions as $question)
        <p>Question: {{ $question->title }}</p>
        <p>Author: {{ $question->author }}</p>
        <p>Date: {{ date_format($question->created_at, 'Y/m/d') }}</p>
        <br>
    @endforeach
</div>
