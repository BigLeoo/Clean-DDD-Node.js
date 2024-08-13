import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionsCommentsUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionsCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionsCommentsUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepository) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionsCommentsUseCaseRequest): Promise<FetchQuestionsCommentsUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
