import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getStoreData } from '@/utils/asyncStorage';

export type ServiceResponse<T> = {
  data: T;
  message?: string;
}

export class Api {
  public optionalHeaders?: { [key: string]: any };

  private http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      timeout: 30000,
      baseURL: 'http://192.168.0.4:3000/api',
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.http.interceptors.request.use(
      async (config: any) => {
        config.headers['Authorization'] =
          `Bearer ${await getStoreData<string>("userJWT")}`;

        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  public async get<T>(url: string): Promise<T> {
    return this.http.get<T>(url).then(this.getData);
  }

  public async post<T>(url: string, data?: any, headers?: any): Promise<T> {
    return this.http.post(url, data, headers).then(this.getData);
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    return this.http.put(url, data).then(this.getData);
  }

  public async patch<T>(url: string, data?: any, headers?: any): Promise<T> {
    return this.http.patch(url, data, headers).then(this.getData);
  }

  public async delete<T>(url: string): Promise<T> {
    return this.http.delete(url).then(this.getData);
  }

  private getData<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

export default new Api();
