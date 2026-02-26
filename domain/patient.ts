export enum PatientsGender {
    Male = 'm',
    Femal = 'f',
}

export interface Patient {
    id: number;
    name: string;
    cpf: string;
    dateOfBirth: Date;
    gender: PatientsGender;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}