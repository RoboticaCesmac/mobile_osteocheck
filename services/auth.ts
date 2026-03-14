import { Professional } from "@/domain/professional";
import { Api, ServiceResponse } from "./api";

export type LoginDTO = {
    email: string;
    password: string;
};

export type SignupDTO = {
    password: string,
    email: string,
    name: string,
};

export type ConfirmSignupTokenDTO = {
    professionalEmail: string;
    signupToken: string;
}

class AuthAPI extends Api {
    async login(loginDTO: LoginDTO): Promise<ServiceResponse<{ professional: Professional, jwt: string }>> {
        return await this.post<ServiceResponse<{ professional: Professional, jwt: string }>>('/professional/login', loginDTO);
    }

    async signUp(signupDTO: SignupDTO): Promise<ServiceResponse<Professional>> {
        return await this.post<ServiceResponse<Professional>>('/professional/signup', signupDTO);
    };

    async confirmSignupToken(confirmSignupTokenDTO: ConfirmSignupTokenDTO): Promise<ServiceResponse<null>> {
        return await this.post<ServiceResponse<null>>('/professional/confirm-signup-token', confirmSignupTokenDTO);
    }

    async profile(): Promise<ServiceResponse<Professional>> {
        return await this.get('/professional/profile');
    }
}

export default new AuthAPI();