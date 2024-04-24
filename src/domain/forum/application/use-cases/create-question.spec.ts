import {beforeEach, describe, expect, it, test} from "vitest";

import {CreateQuestionUseCase} from "@/domain/forum/application/use-cases/create-question";
import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";


let inMemoryQuestionRepository = new InMemoryQuestionsRepository()

let sut: CreateQuestionUseCase

describe('Create Question', () => {


    beforeEach(() => {


        inMemoryQuestionRepository = new InMemoryQuestionsRepository()

        sut = new CreateQuestionUseCase(inMemoryQuestionRepository)

    })


    it('should be able create a question', async () => {


        const result= await sut.execute({
            authorId: '1',
            title: 'teste',
            content: 'teste',
            attachmentsIds:['1','2']
        })

        expect(result.isRight()).toBe(true)
        expect(inMemoryQuestionRepository.items[0].id).toEqual(result.value?.question.id)

        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
        expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
            expect.objectContaining(
                { attachmentId:new UniqueEntityId('1')}
            ),
            expect.objectContaining(
                { attachmentId:new UniqueEntityId('2')}
            )
        ])

    })

})

