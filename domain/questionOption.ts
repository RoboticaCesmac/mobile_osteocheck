import { Question } from "./question";
import { QuestionResponseAnswer } from "./questionResponseAnswer";

export interface QuestionOption {
    id: number;

    questionId: number;

    text: string;

    value: string;

    order: number;

    isTerminal: boolean;

    nextQuestionId: number | null;

    createdAt: Date;

    question: Question;

    nextQuestion: Question | null;

    answers: QuestionResponseAnswer[];
}