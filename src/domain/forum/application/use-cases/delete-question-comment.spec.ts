import { describe, expect, it } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DeleteCommentOnQuestionUseCase } from './delete-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { NotAllowedError } from './errors/not-allowed-error'

let sut: DeleteCommentOnQuestionUseCase
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentsRepository

describe('Delete Question Comment Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteCommentOnQuestionUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question comment by id', async () => {
    await inMemoryQuestionCommentRepository.create(makeQuestionComment())
    await inMemoryQuestionCommentRepository.create(makeQuestionComment())

    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('comment-question-1'),
    )
    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      authorId: 'author-1',
      questionCommentId: 'comment-question-1',
    })

    expect(inMemoryQuestionCommentRepository.items).toHaveLength(2)
  })

  it('should not be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('comment-question-1'),
    )
    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: 'comment-question-1',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
