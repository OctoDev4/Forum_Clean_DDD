import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";


interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string

}

interface DeleteQuestionUseCaseResponse {

}

export class DeleteQuestionUseCase {
    constructor(private questionRepository: QuestionRepository) {
    }

    async execute({
                      questionId,
                      authorId
                  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('question not found')
        }

        if(authorId !== question.authorId.toString()){
            throw new Error('you are not the author of this question')
        }


        await this.questionRepository.delete(question)


        return {}

    }
}