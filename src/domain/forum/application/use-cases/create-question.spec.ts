import { describe, expect, it } from 'vitest'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'

let sut: CreateQuestionUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Create Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'Avai o melhor clube do mundo',
      content: 'O avai é o melhor clube mesmo, não tem como negar',
    })

    expect(question.id).toBeInstanceOf(UniqueEntityID)
    expect(question.content).toEqual(
      'O avai é o melhor clube mesmo, não tem como negar',
    )
    expect(question.title).toEqual('Avai o melhor clube do mundo')
    expect(question.authorId.toValue()).toEqual('1')
  })
})
