import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";

interface EditAnswerUseCaseRequest{
    authorId:string
    answerId:string
    content:string
}

interface EditAnswerUseCaseResponse{

}


export class EditAnswerUseCase{
    constructor(private answerRepository:AnswerRepository) {}


    async execute({authorId,answerId,content}:EditAnswerUseCaseRequest):Promise<EditAnswerUseCaseResponse>{

        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
            throw new Error('answer not found')
        }

        if (authorId !== answer.authorId.toString()){
            throw new Error('you are not the author of this question')
        }

        answer.content = content

        await this.answerRepository.save(answer)

        return {}
    }
}