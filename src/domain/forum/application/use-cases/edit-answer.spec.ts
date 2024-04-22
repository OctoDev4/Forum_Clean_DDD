import { EditQuestionUseCase } from './edit-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import {MakeQuestion} from "../../../../../test/factories/make-question";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {beforeEach, describe, expect, it} from "vitest";
import {InMemoryAnswersRepository} from "../../../../../test/repositories/in-memory-answers-repository";
import {EditAnswerUseCase} from "@/domain/forum/application/use-cases/edit-answers";
import {makeAnswer} from "../../../../../test/factories/make-answers";
import {NotAllowedError} from "@/domain/forum/application/use-cases/errors/not-allowed-error";


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
    beforeEach(() => {
        inMemoryAnswersRepository = new InMemoryAnswersRepository()
        sut = new EditAnswerUseCase(inMemoryAnswersRepository)
    })

    it('should be able to edit an answer', async () => {
        const newQuestion =makeAnswer(
            {
                authorId: new UniqueEntityId('author-1'),
            },
            new UniqueEntityId('answer-1'),
        )

        await inMemoryAnswersRepository.create(newQuestion)

        await sut.execute({
            answerId: newQuestion.id.toValue(),
            authorId: 'author-1',
            content: 'Conteúdo teste',
        })

        expect(inMemoryAnswersRepository.items[0]).toMatchObject({
            content: 'Conteúdo teste',
        })
    })

    it('should not be able to edit an answer from another user', async () => {
        const newQuestion = makeAnswer(
            {
                authorId: new UniqueEntityId('author-1'),
            },
            new UniqueEntityId('answer-1'),
        )

        await inMemoryAnswersRepository.create(newQuestion)

        const result = await sut.execute({
            answerId: newQuestion.id.toValue(),
            authorId: 'author-2',
            content: 'Conteúdo teste',
        })

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})