import { QuestionnaireResult } from "./questionnaireResult";
import { QuestionResponseAnswer } from "./questionResponseAnswer";
import { Patient } from "./patient";

export enum ResponseStatus {
    IN_PROGRESS = 'inProgress',
    COMPLETED = 'completed',
    ABANDONED = 'abandoned',
}

export interface QuestionnaireResponse {
    id: number;

    questionnaireId: number;

    professionalId: number;

    patientId: number;

    status: ResponseStatus;

    completedAt: Date | null;

    createdAt: Date;

    updatedAt: Date;

    questionnaire: QuestionnaireResponse

    result: QuestionnaireResult;

    answers: QuestionResponseAnswer[];

    patient?: Patient;
}