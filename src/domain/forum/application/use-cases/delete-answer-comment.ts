import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

interface DeleteCommentOnAnswerUseCaseResponse {}

export class DeleteCommentOnAnswerUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment =
      await this.answerCommentRepository.findById(answerCommentId)

    if (!answerComment) {
      throw new ResourceNotFoundError()
    }

    if (answerComment.authorId.toString() !== authorId) {
      throw new NotAllowedError()
    }

    await this.answerCommentRepository.delete(answerComment)

    return {
      answerComment,
    }
  }
}
