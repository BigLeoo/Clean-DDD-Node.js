import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answers-comments'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswersCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswersCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

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

    return right({ answerComments })
  }
}
