import { Professional } from "@/domain/professional";
import { Api, ServiceResponse } from "./api";
import { ProfessionalPatients } from "@/domain/professionalPatients";
import { PaginationOptions } from "@/types/PaginationOptions.type";
import { PaginationResult } from "@/types/PaginationResult.type";
import { QuestionnaireResponse } from "@/domain/questionnaireResponse";

export type ChangePasswordDTO = {
    email: string;
    password: string;
}

export type ConfirmForgotPasswordTokenDTO = {
    email: string;
    forgotPasswordToken: string;
}

class ProfessionalAPI extends Api {
    async profile(): Promise<ServiceResponse<Professional>> {
        return await this.get('/professional/profile');
    }

    async getProfessionalPatients(): Promise<ServiceResponse<ProfessionalPatients>> {
        return await this.get(`/professional/patients`);
    }

    async getLastQuestionnaireResponses(paginationOptions?: PaginationOptions): Promise<PaginationResult<QuestionnaireResponse>> {
        const paginationQuery = paginationOptions ? `?page=${paginationOptions.page}&limit=${paginationOptions.limit}` : '';
        return await this.get(`/professional/patients/questionnaire-responses${paginationQuery}`);
    }

    async changePassword(changePasswordDTO: ChangePasswordDTO): Promise<ServiceResponse<null>> {
        return await this.put('/professional/change/password', changePasswordDTO);
    }

    async confirmForgotPasswordToken(confirmForgotPasswordTokenDTO: ConfirmForgotPasswordTokenDTO): Promise<ServiceResponse<null>> {
        return await this.put('/professional/confirm/forgot-password-token', confirmForgotPasswordTokenDTO);
    }

    async sendForgotPasswordToken(professionalEmail: string): Promise<ServiceResponse<{ token: string }>> {
        return await this.put('/professional/send/forgot-password-token', { professionalEmail: professionalEmail });
    }

    async deleteById(): Promise<ServiceResponse<null>> {
        return await this.delete('/professional');
    }
}

export default new ProfessionalAPI();