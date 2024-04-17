// Importa a interface AnswerRepository e a entidade Answer
import {AnswerRepository} from "@/domain/forum/application/repositories/answer-repository";
import {Answer} from "@/domain/forum/enterprise/entities/answer";
import {PaginationParams} from "@/core/repositories/pagination-params";

// Implementa a interface AnswerRepository com um repositório de respostas em memória
export class InMemoryAnswersRepository implements AnswerRepository {
    // Array para armazenar as respostas em memória
    public items: Answer[] = [];

    // Método para encontrar uma resposta pelo ID
    async findById(id: string) {
        // Procura a resposta com o ID fornecido no array de respostas
        const answer = this.items.find(item => item.id.toString() === id);

        // Se a resposta não for encontrada, retorna null
        if (!answer) {
            return null;
        }

        // Retorna a resposta encontrada
        return answer;
    }


    async findManyByQuestionId(questionId: string, {page}: PaginationParams) {
        const answers = this.items.filter(item => item.questionId.toString() === questionId)
            .slice((page - 1) * 20, page * 20)


        return answers
    }


    // Método para criar uma nova resposta
    async create(answer: Answer) {
        // Adiciona a nova resposta ao array de respostas
        this.items.push(answer);
    }

    // Método para salvar uma resposta existente
    async save(answer: Answer) {
        // Encontra o índice da resposta no array de respostas
        const itemsIndex = this.items.findIndex((item) => item.id === answer.id);

        // Se a resposta não for encontrada, lança um erro
        if (itemsIndex === -1) {
            throw new Error('answer not found');
        }

        // Substitui a resposta existente pela resposta atualizada
        this.items[itemsIndex] = answer;
    }

    // Método para excluir uma resposta
    async delete(answer: Answer) {
        // Encontra o índice da resposta no array de respostas
        const itemIndex = this.items.findIndex(item => item.id === answer.id);

        // Remove a resposta do array
        this.items.splice(itemIndex, 1);
    }
}
