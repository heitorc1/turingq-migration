<?php

namespace App\Library;

use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Exchange\AMQPExchangeType;

class RabbitMQ
{
  public $channel;
  public $queue;

  public function __construct()
  {
    $host = env('RABBITMQ_CONNECTION_HOST');
    $port = env('RABBITMQ_CONNECTION_PORT');
    $user = env('RABBITMQ_CONNECTION_USER');
    $password = env('RABBITMQ_CONNECTION_PASSWORD');
    $queue = env('RABBITMQ_QUESTION_RECOMMENDATION_QUEUE');
    $exchange = env('RABBITMQ_QUESTION_RECOMMENDATION_EXCHANGE');

    $connection = new AMQPStreamConnection(
      $host,
      $port,
      $user,
      $password
    );

    $this->channel = $connection->channel();

    $this->channel->queue_declare($queue, false, true, false, false);

    $this->channel->exchange_declare($exchange, AMQPExchangeType::DIRECT, false, true, false);

    $this->channel->queue_bind($queue, $exchange);
  }

  public function getChannel()
  {
    return $this->channel;
  }
}
