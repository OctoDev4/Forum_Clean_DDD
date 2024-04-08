import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";

interface AswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string

}
interface AswerQuestionUseCaseResponse {
     answer: Answer
}



export class AnswerQuestionUseCase {


    constructor(private answerRepository: AnswerRepository) {
    }

    async execute({instructorId, questionId, content}: AswerQuestionUseCaseRequest):Promise<AswerQuestionUseCaseResponse> {

        const answer = Answer.create({
            content,
            authorId:new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)

        });


        await this.answerRepository.create(answer)

        return {
            answer
        }

    }

}