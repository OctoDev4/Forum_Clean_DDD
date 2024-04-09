import {beforeEach, describe, expect, it, test} from "vitest";


import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";
import {GetQuestionBySlugUseCase} from "@/domain/forum/application/use-cases/get-question-by-slug";

import {Slug} from "@/domain/forum/enterprise/entities/value-objects/slug";

import {MakeQuestion} from "../../../../../test/factories/make-question";


let inMemoryQuestionRepository = new InMemoryQuestionsRepository()

let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {


    beforeEach(() => {


        inMemoryQuestionRepository = new InMemoryQuestionsRepository()

        sut = new GetQuestionBySlugUseCase(inMemoryQuestionRepository)

    })


    it('should be able to get a question by slug', async () => {

        const newQuestion = MakeQuestion({
            slug:Slug.create('example-question')
        })
       await inMemoryQuestionRepository.create(newQuestion)


        const {question} = await sut.execute({
            slug:  'example-question'
        })

        expect(question.id).toBeTruthy()
        expect(question.title).toEqual(newQuestion.title)

    })

})

