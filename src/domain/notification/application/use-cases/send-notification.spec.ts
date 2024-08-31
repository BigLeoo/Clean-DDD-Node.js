import { describe, expect, it } from 'vitest'
import { SendNotificationUseCase } from './send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'

let sut: SendNotificationUseCase
let inMemoryNotificationRepository: InMemoryNotificationRepository

describe('Send Notification Use Case', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()

    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to send notification', async () => {
    const result = await sut.execute({
      content: 'content',
      recipientId: 'id-1',
      title: 'title',
    })

    expect(result.isRight()).toBe(true)

    expect(inMemoryNotificationRepository.items).toHaveLength(1)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
