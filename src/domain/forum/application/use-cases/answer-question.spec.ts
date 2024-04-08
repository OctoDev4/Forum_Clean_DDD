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


        const {answer} = await sut.execute({
            instructorId: '1',
            questionId: 'teste',
            content: 'teste'
        })

        expect(answer.id).toBeTruthy()
        expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
        expect(answer.content).toBe('teste')

    })

})

