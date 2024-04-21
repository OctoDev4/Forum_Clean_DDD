import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {Either, left, right} from "@/core/either";
import {ResourceNotFoundError} from "@/domain/forum/application/use-cases/errors/resource-not-found-error";
import {NotAllowedError} from "@/domain/forum/application/use-cases/errors/not-allowed-error";


interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {} >

export class DeleteAnswerUseCase {
    constructor(private answersRepository: AnswerRepository) {}

    async execute({
                      answerId,
                      authorId,
                  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId)

        if (!answer) {
          return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString()) {
           return left(new NotAllowedError())
        }

        await this.answersRepository.delete(answer)

        return right({})
    }
}