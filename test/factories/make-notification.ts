import { faker } from '@faker-js/faker'
import {Notification, NotificationProps} from "@/domain/notification/enterprises/entities/notification";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";




export function makeNotification(
    override: Partial<NotificationProps> = {},
    id?: UniqueEntityId,
) {
    const notification = Notification.create(
        {
            recipientId: new UniqueEntityId(),
            title: faker.lorem.sentence(4),
            content: faker.lorem.sentence(10),
            ...override,
        },
        id,
    )

    return notification
}