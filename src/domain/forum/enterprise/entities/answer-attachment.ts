import {Entity} from "@/core/entities/entity";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";

interface AnswerAttachmentProps{
    AnswerId:string,
    attachmentId:string
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps>{

    get questionId(){
        return this.props.questionId;
    }

    get attachmentId(){
        return this.props.attachmentId
    }

    static create(props:AnswerAttachmentProps,id?:UniqueEntityId){

        const attachment = new AnswerAttachment(props,id)

        return attachment

    }




}