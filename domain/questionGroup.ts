import { Question } from "./question";
import { Questionnaire } from "./questionnaire";

export interface QuestionGroup {
    id: string;

    questionnaireId: string;

    name: string;

    description: string;

    order: number;

    isInitial: boolean;

    createdAt: Date;

    updatedAt: Date;

    questionnaire: Questionnaire;

    questions: Question[];
}