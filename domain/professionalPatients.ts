import { Patient } from "./patient";
import { Professional } from "./professional";

export interface ProfessionalPatients {
    id: number;
    professional: Professional;
    patients: Patient[];
}