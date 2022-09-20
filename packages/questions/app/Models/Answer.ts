import { DateTime } from 'luxon'
import { belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'

import Question from 'App/Models/Question'
import Author from 'App/Models/Author'

import IdentifiableModel from 'App/Helpers/Orm/IdentifiableModel'

export default class Answer extends IdentifiableModel {
  @column()
  public body: string

  @column()
  public questionId: string

  @column()
  public authorId: string

  @belongsTo(() => Author, { foreignKey: 'authorId' })
  public author: BelongsTo<typeof Author>

  @belongsTo(() => Question, { foreignKey: 'questionId' })
  public question: BelongsTo<typeof Question>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
