import { Professional } from "@/domain/professional";
import { Api, ServiceResponse } from "./api";


class ProfessionalAPI extends Api {
    async profile(): Promise<ServiceResponse<Professional>> {
        return await this.get('/professional/profile');
    }
}

export default new ProfessionalAPI();