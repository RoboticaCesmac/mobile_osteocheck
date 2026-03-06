import { Question } from "./question";
import { QuestionnaireResponse } from "./questionnaireResponse";
import { QuestionOption } from "./questionOption";

export interface QuestionResponseAnswer {
    id: number;

    responseId: number;

    questionId: number;

    optionId: number | null;

    textAnswer: string | null;

    createdAt: Date;

    updatedAt: Date;

    response: QuestionnaireResponse;

    question: Question;

    option: QuestionOption | null;
}