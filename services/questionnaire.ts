import { Question } from "@/domain/question";
import { Api, ServiceResponse } from "./api";

export type NextQuestionDTO = {
    questionnaireType: string;
    patientId: number;
    questionOptionsIds?: number[];
    questionId?: number;
}

export type QuestionnaireProgressDTO = {
    questionnaireType: string;
    patientId: number;
}

export type QuestionnaireProgressResponse = {
    isBeggining: boolean;
    questionnaireId?: number;
    questionId?: number;
    questionOptionsIds?: number[];
}

class QuestionnaireAPI extends Api {
    async nextQuestion(nextQuestionDTO: NextQuestionDTO): Promise<ServiceResponse<Question | null>> {
        return await this.post('/questionnaire/next-question', nextQuestionDTO);
    }

    async getQuestionnaireProgress(questionnaireProgressDTO: QuestionnaireProgressDTO): Promise<ServiceResponse<QuestionnaireProgressResponse>> {
        const queryParams = new URLSearchParams({
            questionnaireType: questionnaireProgressDTO.questionnaireType,
            patientId: questionnaireProgressDTO.patientId.toString(),
        });
        return await this.get(`/questionnaire/progress?${queryParams.toString()}`);
    }
}

export default new QuestionnaireAPI();