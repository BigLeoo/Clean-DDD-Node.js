import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionCommentsRepository {
  findManyByQuestionId(
    id: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>
  findById(id: string): Promise<QuestionComment | null>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
