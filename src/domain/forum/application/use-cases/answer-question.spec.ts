import { describe, expect, it } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let sut: AnswerQuestionUseCase
let inMemoryAnswerRepository: InMemoryAnswersRepository

describe('Answer Question Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: 'This is an answer',
    })

    expect(answer.id).toBeTruthy()
    expect(answer.content).toEqual('This is an answer')
  })
})
