import {beforeEach, describe, expect, it, test} from "vitest";

import {CreateQuestionUseCase} from "@/domain/forum/application/use-cases/create-question";
import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";
import {GetQuestionBySlugUseCase} from "@/domain/forum/application/use-cases/get-question-by-slug";
import {Question} from "@/domain/forum/enterprise/entities/question";
import {Slug} from "@/domain/forum/enterprise/entities/value-objects/slug";
import {UniqueEntityId} from "@/core/entities/unique-entity-id";
import {MakeQuestion} from "../../../../../test/factories/make-question";
import {DeleteQuestionUseCase} from "@/domain/forum/application/use-cases/delete-question";


let inMemoryQuestionRepository = new InMemoryQuestionsRepository()

let sut: DeleteQuestionUseCase

describe('Delete Question ', () => {


    beforeEach(() => {


        inMemoryQuestionRepository = new InMemoryQuestionsRepository()

        sut = new DeleteQuestionUseCase(inMemoryQuestionRepository)

    })


    it('it should be able to delete a question', async () => {

        const newQuestion = MakeQuestion({
            authorId:new UniqueEntityId('author-1')
        },new UniqueEntityId('question-1'))
        await inMemoryQuestionRepository.create(newQuestion)


       await sut.execute({
            questionId:'question-1',
             authorId:'author-1'
        })


        expect(inMemoryQuestionRepository.items).toHaveLength(0)



    })



    it('it should not be able to delete a question from another user', async () => {

        const newQuestion = MakeQuestion({
            authorId:new UniqueEntityId('author-1')
        },new UniqueEntityId('question-1'))
        await inMemoryQuestionRepository.create(newQuestion)




      expect(()=>{
          return sut.execute({
              questionId:'question-1',
              authorId:'author-error'
          })

      }).rejects.toBeInstanceOf(Error)

    })

})

