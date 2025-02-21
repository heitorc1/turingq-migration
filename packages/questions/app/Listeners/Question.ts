import { EventsList } from '@ioc:Adonis/Core/Event'

import AmqpListener from './AmqpListener'

export default class Question extends AmqpListener {
  public async onNewQuestion(questionModel: EventsList['new:question']) {
    await questionModel.load('author')

    const question = questionModel.toJSON()

    this.subscribeAuthor(question, question.author)
    this.questionRecommendation(question, question.author)
  }

  private subscribeAuthor(question: Record<string, unknown>, author: Record<string, unknown>) {
    const messageContent = {
      question: {
        id: question.id,
      },
      subscriber: {
        id: author.id,
        email: author.email,
      },
    }

    this.publishMessage('new:question', messageContent)
  }

  private questionRecommendation(
    question: Record<string, unknown>,
    author: Record<string, unknown>
  ) {
    const messageContent = {
      question: {
        id: question.id,
        title: question.title,
        author: author.name,
        author_email: author.email,
      },
    }

    this.publishMessage('new:question-recommendation', messageContent)
  }
}
