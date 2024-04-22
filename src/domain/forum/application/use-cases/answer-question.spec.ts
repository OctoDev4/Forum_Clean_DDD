import {beforeEach, describe, expect, it, test} from "vitest";


import {InMemoryAnswersRepository} from "../../../../../test/repositories/in-memory-answers-repository";
import {AnswerQuestionUseCase} from "@/domain/forum/application/use-cases/answer-question";


let inMemoryAnswersRepository:InMemoryAnswersRepository

let sut: AnswerQuestionUseCase

describe('Create Question', () => {


    beforeEach(() => {


        inMemoryAnswersRepository = new InMemoryAnswersRepository()

       sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)

    })


    it('should be able create a question', async () => {


        const result= await sut.execute({
            instructorId: '1',
            questionId: 'teste',
            content: 'teste'
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)


    })

})

