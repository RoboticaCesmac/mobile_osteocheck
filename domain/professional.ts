import { Patient } from "./patient";

export interface Professional {
    id: number;

    name: string;

    email: string;

    password: string;

    accountConfirmationToken: string;

    forgotPasswordToken?: string;

    hasConfirmedAccount: boolean;

    patients: Patient[];

    createdAt: Date;

    updatedAt: Date;

    deletedAt: Date;
}