import { describe, expect, it } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-question-repository'
import { makeQuestion } from 'test/factories/make-question'

let sut: CommentOnQuestionUseCase
let inMemoryQuestionsCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionRepository

describe('Comment On Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepository()
    inMemoryQuestionsCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion()

    await inMemoryQuestionsRepository.create(newQuestion)

    const { questionComment } = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      content: 'comment on question',
    })

    expect(questionComment.id).toBeInstanceOf(UniqueEntityID)
    expect(questionComment.content).toEqual('comment on question')
    expect(inMemoryQuestionsCommentsRepository.items[0].content).toEqual(
      'comment on question',
    )
  })
})
