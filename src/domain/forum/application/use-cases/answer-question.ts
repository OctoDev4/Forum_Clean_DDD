import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {Either, right} from "@/core/either";

interface AswerQuestionUseCaseRequest {
    instructorId: string;
    questionId: string;
    content: string

}
type AswerQuestionUseCaseResponse = Either<null, {
    answer: Answer
} >



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

        return right({
            answer,
        })

    }

}