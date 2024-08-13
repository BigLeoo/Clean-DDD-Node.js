import { describe, expect, it } from 'vitest'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { FetchRecentQuestionsUseCase } from './fetch-recent-questions'

let sut: FetchRecentQuestionsUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Fetch Recent Questions Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('should be able to fecth recent questions, sorted by recent date', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 20),
      }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 18),
      }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({
        createdAt: new Date(2024, 0, 23),
      }),
    )

    const { questions } = await sut.execute({
      page: 1,
    })

    expect(questions).toHaveLength(3)
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 18) }),
    ])
  })

  it('should be able to fecth paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const { questions } = await sut.execute({
      page: 2,
    })

    expect(questions).toHaveLength(2)
  })
})
