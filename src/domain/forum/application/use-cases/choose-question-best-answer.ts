import { AnswerRepository } from '../repositories/answer-repository'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'

interface ChooseQuestionBestAswerUseCaseRequest {
  authorId: string
  answerId: string
}

interface ChooseQuestionBestAswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAswerUseCaseRequest): Promise<ChooseQuestionBestAswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new ResourceNotFoundError()
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new ResourceNotFoundError()
    }

    if (authorId !== question.authorId.toString()) {
      throw new NotAllowedError()
    }

    question.bestAnswerId = answer.id

    await this.questionRepository.save(question)

    return { question }
  }
}
