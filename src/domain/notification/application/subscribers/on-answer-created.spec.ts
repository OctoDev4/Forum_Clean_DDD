import {
    SendNotificationUseCase,
    SendNotificationUseCaseRequest
} from "@/domain/notification/application/use-cases/send-notification";
import {InMemoryNotificationsRepository} from "../../../../../test/repositories/in-memory-notifications-repository";
import {InMemoryAnswerAttachmentsRepository} from "../../../../../test/repositories/in-memory-answer-attachments";
import {InMemoryAnswersRepository} from "../../../../../test/repositories/in-memory-answers-repository";
import {QuestionRepository} from "@/domain/forum/application/repositories/question-repository";
import {QuestionAttachment} from "@/domain/forum/enterprise/entities/question-attachment";
import {MockInstance} from "vitest";
import {InMemoryQuestionsRepository} from "../../../../../test/repositories/in-memory-questions-repository";
import {
    InMemoryQuestionAttachmentsRepository
} from "../../../../../test/repositories/in-memory-question-attachments-repository";
import {OnAnswerCreated} from "@/domain/notification/application/subscribers/on-answer-created";
import {MakeQuestion} from "../../../../../test/factories/make-question";
import {makeAnswer} from "../../../../../test/factories/make-answers";
import {waitFor} from "../../../../../test/utils/wait-for";

let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository;
let questionsRepository: QuestionRepository;
let answersRepository: InMemoryAnswersRepository;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let notificationsRepository: InMemoryNotificationsRepository;
let sendNotificationUseCase: SendNotificationUseCase;

let sendNotificationExecuteSpy: MockInstance<
    [SendNotificationUseCaseRequest],
    Promise<SendNotificationUseCase>
>;

// Adicionei aqui
const sendNotificationUseCaseCallback = vi.fn();

describe('On Answer Created', () => {
    beforeEach(() => {
        questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository();
        questionsRepository = new InMemoryQuestionsRepository(questionAttachmentsRepository);

        answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
        answersRepository = new InMemoryAnswersRepository(answerAttachmentsRepository);

        notificationsRepository = new InMemoryNotificationsRepository();
        sendNotificationUseCase = new SendNotificationUseCase(notificationsRepository);

        // Alterei aqui usando a função criada acima
        sendNotificationExecuteSpy = sendNotificationUseCaseCallback(sendNotificationUseCase, 'execute');

        new OnAnswerCreated(questionsRepository, sendNotificationUseCase);
    });

    it('should send a notification when an answer is created', async () => {
        const question = MakeQuestion();
        const answer = makeAnswer({ questionId: question.id });

        await questionsRepository.create(question);
        await answersRepository.create(answer);

        await waitFor(() => {
            expect(sendNotificationUseCaseCallback).toHaveBeenCalled();
        });
    });
});
