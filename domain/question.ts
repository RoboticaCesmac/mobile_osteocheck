import { QuestionGroup } from "./questionGroup";
import { QuestionOption } from "./questionOption";
import { QuestionResponseAnswer } from "./questionResponseAnswer";

export enum QuestionType {
    TEXT = 'text',
    SINGLE_CHOICE = 'singleChoice',
    MULTIPLE_CHOICE = 'multipleChoice',
    DATE = 'date',
    NUMBER = 'number',
}

export interface Question {
    id: number;
    groupId: string;

    text: string;

    type: QuestionType;

    order: number;

    isRequired: boolean;

    helpText: string;

    createdAt: Date;

    updatedAt: Date;
    group: QuestionGroup;

    options: QuestionOption[];

    answers: QuestionResponseAnswer[];
}