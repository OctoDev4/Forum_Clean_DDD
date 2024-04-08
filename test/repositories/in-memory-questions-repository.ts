import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {Question} from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements  QuestionRepository{

    public items:Question[] = []



    async findById(id: string){

        const question = this.items.find(item => item.id.toString() === id)

        if(!question){
            throw new Error('question not found')
        }


        return question


    }


    async findBySlug(slug:string){
        const question = this.items.find(item=>item.slug.value === slug)


        if (!question){
            return null
        }

        return question
    }


    async create(question: Question){

        this.items.push(question)
    }

    async delete(question:Question){
      const itemIndex = this.items.findIndex(item=>item.id === question.id);
      
      
      this.items.splice(itemIndex, 1)
    }

}