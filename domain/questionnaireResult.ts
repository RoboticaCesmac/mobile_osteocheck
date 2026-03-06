import { QuestionnaireResponse } from "./questionnaireResponse";

export enum QuestionnaireResultType {
    OnmRmRisk = 'onm-rmRisk',
    OnmRmSuspectionOnStageZero = 'onm-rmSuspectionOnStageZero',
    OnmRmEstablished = 'onm-rmEstablished',
    OnmRmInsignificantRisk = 'onm-rmInsignificantRisk',
    StageOne = 'stageOne',
    StageTwo = 'stageTwo',
    StageThree = 'stageThree',
}

export interface QuestionnaireResult {
    id: number;

    text: string;

    response: QuestionnaireResponse;

    type: QuestionnaireResultType;

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date | null;
}