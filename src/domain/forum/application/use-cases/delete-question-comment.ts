import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteCommentOnQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

interface DeleteCommentOnQuestionUseCaseResponse {}

export class DeleteCommentOnQuestionUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new ResourceNotFoundError()
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new NotAllowedError()
    }

    await this.questionCommentRepository.delete(questionComment)

    return {
      questionComment,
    }
  }
}
