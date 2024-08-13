import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionRepository } from '../repositories/question-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new ResourceNotFoundError()
    }

    if (authorId !== question.authorId.toString()) {
      throw new NotAllowedError()
    }

    await this.questionRepository.delete(questionId)

    return {}
  }
}
