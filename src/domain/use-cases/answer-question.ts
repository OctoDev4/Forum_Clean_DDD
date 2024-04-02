import {Answer} from "@/domain/entities/answer";
import {AnswerRepository} from "@/domain/repositories/answer-repository";

interface AswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string

}


export class AnswerQuestionUseCase {


    constructor(private answerRepository: AnswerRepository) {
    }

    async execute({instructorId, questionId, content}: AswerQuestionUseCaseRequest) {

        const answer = new Answer({
            content,
            authorId: instructorId,
            questionId: questionId
        });


        await this.answerRepository.create(answer)

        return answer

    }

}