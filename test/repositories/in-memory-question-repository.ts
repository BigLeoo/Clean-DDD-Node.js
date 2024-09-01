import { DomainEvents } from '@/core/events/domain-events'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionRepository implements QuestionRepository {
  constructor(
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {
    this.questionAttachmentsRepository = questionAttachmentsRepository
  }

  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((question) => {
      return question.id.toString() !== id
    })

    this.questionAttachmentsRepository.deleteManyByQuestionId(id)
  }

  async save(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => {
      return item.id.toString() === question.id.toString()
    })

    this.items[itemIndex] = question

    DomainEvents.dispatchEventsForAggregate(question.id)
  }

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((question) => {
      return question.id.toString() === id
    })

    if (!question) {
      return null
    }

    return question
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find((question) => question.slug.value === slug)

    if (!question) {
      return null
    }

    return question
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = this.items
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
      .slice((page - 1) * 20, page * 20)

    return questions
  }
}
