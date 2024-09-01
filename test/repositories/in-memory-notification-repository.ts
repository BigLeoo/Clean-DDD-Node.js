import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.items.find((notification) => {
      return notification.id.toString() === id
    })

    if (!notification) {
      return null
    }

    return notification
  }

  async save(notification: Notification): Promise<void> {
    const itemIndex = this.items.findIndex((item) => {
      return item.id.toString() === notification.id.toString()
    })

    this.items[itemIndex] = notification
  }
}
