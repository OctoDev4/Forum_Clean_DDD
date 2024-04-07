import {expect, test} from "vitest";

import {AnswerQuestionUseCase} from "@/domain/forum/application/use-cases/answer-question";

import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {Question} from "@/domain/forum/enterprise/entities/question";
import {CreateQuestionUseCase} from "@/domain/forum/application/use-cases/create-question";


const fakeQuestionsRepository:QuestionRepository = {

   create: async(question:Question)=>{
       return;
   },

}


test('create a question',async ()=>{
    const createQuestion = new CreateQuestionUseCase(fakeQuestionsRepository)


    const {question} = await createQuestion.execute({
        authorId:'1',
        title:'teste',
        content:'teste'
    })

    expect(question.id).toBeTruthy()

})