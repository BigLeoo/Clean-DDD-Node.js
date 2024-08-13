import { describe, expect, it } from 'vitest'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let sut: GetQuestionBySlugUseCase
let inMemoryQuestionRepository: InMemoryQuestionRepository

describe('Get Question by Slug Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: new Slug('example-question') })
    await inMemoryQuestionRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('example-question')
  })
})
