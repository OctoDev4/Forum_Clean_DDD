import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {QuestionComment} from "@/domain/forum/enterprise/entities/question-comment";
import {QuestionCommentRepository} from "@/domain/forum/application/repositories/question-comment-repository";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";

interface CommentOnQuestionUseCaseRequest{
    authorId:string;
    questionId:string;
    content:string;

}

interface CommentOnQuestionUseCaseResponse{

    questionComment:QuestionComment

}


export class CommentOnQuestionUseCase{
    constructor(
        private QuestionsRepository:QuestionRepository,
        private questionCommentRepository:QuestionCommentRepository
        ) {}


    async execute({authorId,questionId,content}:CommentOnQuestionUseCaseRequest):Promise<CommentOnQuestionUseCaseResponse>{
        const question = await this.QuestionsRepository.findById(questionId)


        if(!question){
            throw new Error('question not found')
        }

        const questionComment = QuestionComment.create({
            authorId:new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content:content
        })


        await this.questionCommentRepository.create(questionComment)


        return{
            questionComment
        }
    }

}