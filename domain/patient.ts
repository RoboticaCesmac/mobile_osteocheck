import { QuestionnaireResponse } from "./questionnaireResponse";

export enum PatientsGender {
    Male = 'm',
    Femal = 'f',
}

export interface Patient {
    id: number;
    name: string;
    cpf: string;
    dateOfBirth: Date;
    gender: PatientsGender;
    questionnaireResponses: QuestionnaireResponse[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}