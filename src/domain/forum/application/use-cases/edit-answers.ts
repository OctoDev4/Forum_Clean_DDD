
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {Either, left, right} from "@/core/either";
import {ResourceNotFoundError} from "@/domain/forum/application/use-cases/errors/resource-not-found-error";
import {NotAllowedError} from "@/domain/forum/application/use-cases/errors/not-allowed-error";

interface EditAnswerUseCaseRequest{
    authorId:string
    answerId:string
    content:string
}

type EditAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {} >


export class EditAnswerUseCase{
    constructor(private answerRepository:AnswerRepository) {}


    async execute({authorId,answerId,content}:EditAnswerUseCaseRequest):Promise<EditAnswerUseCaseResponse>{

        const answer = await this.answerRepository.findById(answerId)

        if(!answer){
           return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()){
         return left(new NotAllowedError())
        }

        answer.content = content

        await this.answerRepository.save(answer)

        return right({

        })
    }
}