import {beforeEach, describe, expect, it, test} from "vitest";


import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";

import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {MakeQuestion} from "../../../../../test/factories/make-question";
import {EditQuestionUseCase} from "@/domain/forum/application/use-cases/edit-question";




let inMemoryQuestionRepository = new InMemoryQuestionsRepository

let sut: EditQuestionUseCase

describe('Delete Question ', () => {


    beforeEach(() => {


        inMemoryQuestionRepository = new InMemoryQuestionsRepository()

        sut = new EditQuestionUseCase(inMemoryQuestionRepository)

    })


    it('it should be able to delete a question', async () => {

        const newQuestion = MakeQuestion({
            authorId:new UniqueEntityId('author-1')
        },new UniqueEntityId('question-1'))
        await inMemoryQuestionRepository.create(newQuestion)


        await sut.execute({
          authorId:'author-1',
            title:'Test',
            content:'Test',
            questionId:newQuestion.id.toString()
        })


        expect(inMemoryQuestionRepository.items[0]).toMatchObject({
            title:'Test',
            content:'Test'
        })



    })


    it('it should be able to delete a question', async () => {

        const newQuestion = MakeQuestion({
            authorId:new UniqueEntityId('author-1')
        },new UniqueEntityId('question-1'))
        await inMemoryQuestionRepository.create(newQuestion)


      expect(()=>{
          return sut.execute({
              authorId:'author-2',
              title:'Test',
              content:'Test',
              questionId:newQuestion.id.toString()
          })
      }).rejects.toBeInstanceOf(Error)


    })



})

