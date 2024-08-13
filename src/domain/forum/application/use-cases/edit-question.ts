import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { QuestionRepository } from '../repositories/question-repository'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { Question } from '../../enterprise/entities/question'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new ResourceNotFoundError()
    }

    if (authorId !== question.authorId.toString()) {
      throw new NotAllowedError()
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {
      question,
    }
  }
}
