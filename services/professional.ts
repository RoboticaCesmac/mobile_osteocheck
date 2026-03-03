import { Professional } from "@/domain/professional";
import { Api, ServiceResponse } from "./api";
import { Patient } from "@/domain/patient";
import { ProfessionalPatients } from "@/domain/professionalPatients";


class ProfessionalAPI extends Api {
    async profile(): Promise<ServiceResponse<Professional>> {
        return await this.get('/professional/profile');
    }

    async getProfessionalPatients(): Promise<ServiceResponse<ProfessionalPatients>> {
        return await this.get(`/professional/patients`);
    }
}

export default new ProfessionalAPI();