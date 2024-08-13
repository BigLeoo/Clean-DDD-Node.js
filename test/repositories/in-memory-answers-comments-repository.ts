import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answers-comments'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(questionComment: AnswerComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findManyByAnswerId(
    id: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerId.toString() === id)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    return answerComment ?? null
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.items = this.items.filter((answers) => {
      return answers.id.toString() !== answerComment.id.toString()
    })
  }
}
