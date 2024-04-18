import {AnswerComment} from "@/domain/forum/enterprise/entities/answer-comment";


export interface AnswerCommentsRepository{
    findById(id:string):Promise<AnswerComment | null>
    create(answerComment:AnswerComment): Promise<void>
    delete(AnswerComment:AnswerComment): Promise<void>
}