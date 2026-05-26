import { QuestionnaireResponse } from "./questionnaireResponse";

export enum PatientsGender {
    Male = 'm',
    Female = 'f',
}

export interface Patient {
    id: number;
    name: string;
    identifier: string;
    dateOfBirth: Date;
    gender: PatientsGender;
    questionnaireResponses: QuestionnaireResponse[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}