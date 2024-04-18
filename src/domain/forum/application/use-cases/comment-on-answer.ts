import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {AnswerComment} from "@/domain/forum/enterprise/entities/answer-comment";

import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {AnswerCommentsRepository} from "@/domain/forum/application/repositories/answer-comments-repository";

interface CommentOnAnswerUseCaseRequest{
    authorId:string;
    answerId:string;
    content:string;

}

interface CommentOnAnswerUseCaseResponse{

    answerComment:AnswerComment

}


export class CommentOnAnswerUseCase{
    constructor(
        private AnswersRepository:AnswerRepository,
        private answerCommentRepository:AnswerCommentsRepository
    ) {}


    async execute({authorId,answerId,content}:CommentOnAnswerUseCaseRequest):Promise<CommentOnAnswerUseCaseResponse>{
        const answer = await this.AnswersRepository.findById(answerId)


        if(!answer){
            throw new Error('answer not found')
        }

        const answerComment = AnswerComment.create({
            authorId:new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content:content
        })


        await this.answerCommentRepository.create(answerComment)


        return{
            answerComment
        }
    }

}