import { QuestionGroup } from "./questionGroup";
import { QuestionnaireResponse } from "./questionnaireResponse";

export enum QuestionnaireType {
    JawAssessment = 'jawAssessment'
}

export interface Questionnaire {
    id: number;

    title: string;

    description: string;

    isActive: boolean;

    type: QuestionnaireType;

    createdAt: Date;

    updatedAt: Date;

    groups: QuestionGroup[];

    responses: QuestionnaireResponse[];
}