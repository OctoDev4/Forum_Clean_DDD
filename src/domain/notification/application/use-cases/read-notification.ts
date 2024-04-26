import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {Either} from "@/core/either";
import {Notification} from "@/domain/notification/enterprises/entities/notification";
import {NotificationsRepository} from "@/domain/notification/application/repositories/notifications-repository";

interface ReadNotificationUseCaseRequest{
    recipientId: UniqueEntityId
  notificationId:string
}

type ReadNotificationUseCasesponse =Either<null, {
    notification:Notification
}>

export class ReadNotificationUseCase{
    constructor(private notificationRepository:NotificationsRepository) {}


    async execute({recipientId,notificationId}:ReadNotificationUseCaseRequest):Promise<ReadNotificationUseCasesponse>{

        const notification  = await this.notificationRepository.findById(notificationId)


    }
}