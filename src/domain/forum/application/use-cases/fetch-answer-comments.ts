import { AnswerComment } from '../../enterprise/entities/answers-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string
  page: number
}

interface FetchAnswersCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswersCommentsUseCase {
  constructor(private answerCommentRepository: AnswerCommentsRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswersCommentsUseCaseRequest): Promise<FetchAnswersCommentsUseCaseResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(answerId, {
        page,
      })

    return { answerComments }
  }
}
