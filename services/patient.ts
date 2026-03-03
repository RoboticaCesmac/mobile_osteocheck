import { Api, ServiceResponse } from "./api";
import { Patient } from "@/domain/patient";


class PatientAPI extends Api {
    async findById(patientId: number): Promise<ServiceResponse<Patient | null>> {
        return await this.get(`/patients/${patientId}`);
    }
}

export default new PatientAPI();