import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {Either, right} from "@/core/either";

interface FetchQuestionAnswersUseCaseRequest {
    questionId:string
    page:number
}

type FetchQuestionAnswersUseCaseResponse = Either<null, {
    answers:Answer[]
}>


export class FetchQuestionAnswersUseCase {
    constructor(private answersRepository: AnswerRepository) {}

    async execute({page,questionId}:FetchQuestionAnswersUseCaseRequest):Promise<FetchQuestionAnswersUseCaseResponse>{


       const answers = await this.answersRepository.findManyByQuestionId(questionId,{page})

        return right({
            answers
        })


    }

}