import { ResponseStatus } from "@/domain/questionnaireResponse";

export function translateQuestionnaireResponseStatus(responseStatus: ResponseStatus) {
    switch (responseStatus) {
        case ResponseStatus.COMPLETED:
            return 'Completado'
        case ResponseStatus.IN_PROGRESS:
            return 'Em progresso'
        case ResponseStatus.ABANDONED:
            return 'Abandonado'
        default:
            return 'Indefinido'
    }
}