import {beforeEach, describe, expect, it, test} from "vitest";

import {CreateQuestionUseCase} from "@/domain/forum/application/use-cases/create-question";
import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";


let inMemoryQuestionRepository = new InMemoryQuestionsRepository()

let sut: CreateQuestionUseCase

describe('Create Question', () => {


    beforeEach(() => {


        inMemoryQuestionRepository = new InMemoryQuestionsRepository()

        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

    })


    it('should be able create a question', async () => {


        const {question} = await sut.execute({
            authorId: '1',
            title: 'teste',
            content: 'teste'
        })

        expect(question.id).toBeTruthy()
        expect(inMemoryQuestionRepository.items[0].id).toEqual(question.id)

    })

})

