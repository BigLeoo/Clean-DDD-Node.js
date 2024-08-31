import { WatchedList } from '@/core/entities/watched-list'
import { AnswerAttachment } from './answer-attachment'

export class AnswerAttachmentList extends WatchedList<AnswerAttachment> {
  // This will be used to compare the items in the list so we can determine if they are the same or not
  compareItems(a: AnswerAttachment, b: AnswerAttachment): boolean {
    return a.attachmentId.equals(b.attachmentId)
  }
}
