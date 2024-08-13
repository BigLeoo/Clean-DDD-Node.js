import { describe, expect, it } from 'vitest'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { DeleteCommentOnAnswerUseCase } from './delete-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let sut: DeleteCommentOnAnswerUseCase
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository

describe('Delete Answer Comment Use Case', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new DeleteCommentOnAnswerUseCase(inMemoryAnswerCommentRepository)
  })

  it('should be able to delete a answer comment by id', async () => {
    await inMemoryAnswerCommentRepository.create(makeAnswerComment())
    await inMemoryAnswerCommentRepository.create(makeAnswerComment())

    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('comment-answer-1'),
    )
    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    await sut.execute({
      authorId: 'author-1',
      answerCommentId: 'comment-answer-1',
    })

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(2)
  })

  it('should not be able to delete a question comment', async () => {
    const newAnswerComment = makeAnswerComment(
      { authorId: new UniqueEntityID('author-1') },
      new UniqueEntityID('comment-answer-1'),
    )
    await inMemoryAnswerCommentRepository.create(newAnswerComment)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerCommentId: 'comment-answer-1',
      })
    }).rejects.toBeInstanceOf(NotAllowedError)
  })
})
