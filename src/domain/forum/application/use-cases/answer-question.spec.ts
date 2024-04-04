import {expect, test} from "vitest";

import {AnswerQuestionUseCase} from "@/domain/forum/application/use-cases/answer-question";
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {Answer} from "@/domain/forum/enterprise/entities/answer";


const fakeAnswerRepository:AnswerRepository = {
    
    create: async (answer:Answer) =>{
        return;
    }
}


test('create an answer',async ()=>{
    const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository)

    const answer = await answerQuestion.execute({
        questionId:'1',
        instructorId:'1',
        content:'nova resposta'
    })

    expect(answer.content).toEqual('nova resposta')

})