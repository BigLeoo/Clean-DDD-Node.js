import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((answer) => {
      return answer.id.toString() !== id
    })
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => {
      return item.id.toString() === answer.id.toString()
    })

    this.items[itemIndex] = answer
  }

  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((answer) => {
      return answer.id.toString() === id
    })

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }
}
