import { Api, ServiceResponse } from "./api";
import { Patient, PatientsGender } from "@/domain/patient";

type CreatePatientDTO = {
    professionalId: number;
    cpf: string;
    dateOfBirth: Date;
    name: string;
    gender: PatientsGender
}

class PatientAPI extends Api {
    async findById(patientId: number): Promise<ServiceResponse<Patient | null>> {
        return await this.get(`/patients/${patientId}`);
    }

    async create(createPatientDTO: CreatePatientDTO): Promise<ServiceResponse<Patient>> {
        return await this.post(`/patients`, createPatientDTO);
    }
}

export default new PatientAPI();