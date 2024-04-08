import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";

interface EditQuestionUseCaseRequest{
    authorId:string
    questionId:string
    title:string,
    content:string
}

interface EditQuestionUseCaseResponse{

}


export class EditQuestionUseCase{
    constructor(private questionRepository:QuestionRepository) {}


    async execute({authorId,questionId,title,content}:EditQuestionUseCaseRequest):Promise<EditQuestionUseCaseResponse>{

       const question = await this.questionRepository.findById(questionId)

        if(!question){
            throw new Error('question not found')
        }

        if (authorId !== question.authorId.toString()){
            throw new Error('you are not the author of this question')
        }

        question.title = title
        question.content = content

        await this.questionRepository.save(question)

        return {}
    }
}