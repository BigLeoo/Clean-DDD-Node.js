import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerRepository } from '@/domain/forum/application/repositories/answer-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryAnswersRepository implements AnswerRepository {
  constructor(
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {
    this.answerAttachmentsRepository = answerAttachmentsRepository
  }

  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((answer) => {
      return answer.id.toString() !== id
    })

    this.answerAttachmentsRepository.deleteManyByAnswerId(id)
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
