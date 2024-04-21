import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {Either, left, right} from "@/core/either";
import {ResourceNotFoundError} from "@/domain/forum/application/use-cases/errors/resource-not-found-error";
import {NotAllowedError} from "@/domain/forum/application/use-cases/errors/not-allowed-error";

interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string,
    content: string
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>


export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) {
    }


    async execute({
                      authorId,
                      questionId,
                      title,
                      content
                  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== question.authorId.toString()) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content

        await this.questionRepository.save(question)

        return right({})
    }
}