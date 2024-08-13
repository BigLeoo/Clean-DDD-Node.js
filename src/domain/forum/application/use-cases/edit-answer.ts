import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AnswerRepository } from '../repositories/answer-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Answer } from '../../enterprise/entities/answer'

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new ResourceNotFoundError()
    }

    if (authorId !== answer.authorId.toString()) {
      throw new NotAllowedError()
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return {
      answer,
    }
  }
}
