import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";

interface FetchQuestionAnswersUseCaseRequest {
    questionId:string
    page:number
}

interface FetchQuestionAnswersUseCaseResponse {
    answers:Answer[]
}


export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswerRepository) {}

    async execute({page,questionId}:FetchQuestionAnswersUseCaseRequest):Promise<FetchQuestionAnswersUseCaseResponse>{


       const answers = await this.answersRepository.findManyByQuestionId(questionId,{page})

        return {
            answers
        }


    }

}