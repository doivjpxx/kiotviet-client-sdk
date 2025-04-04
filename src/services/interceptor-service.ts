import { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { TokenManager } from './token-manager';
import { ErrorHandler } from './error-handler';
import { HTTP_METHODS, CONTENT_TYPES } from '../config/constants';

export class InterceptorService {
  constructor(
    private apiClient: AxiosInstance,
    private tokenManager: TokenManager,
    private retailerName: string,
  ) {
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.setupRequestInterceptor();
    this.setupResponseInterceptor();
  }

  private setupRequestInterceptor(): void {
    this.apiClient.interceptors.request.use(
      async (request: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const token = await this.tokenManager.getValidToken();
        request.headers['Authorization'] = `Bearer ${token}`;
        request.headers['Retailer'] = this.retailerName;

        if (
          Object.values(HTTP_METHODS).includes(request.method?.toUpperCase() as any) &&
          request.data &&
          !request.headers['Content-Type']
        ) {
          request.headers['Content-Type'] = CONTENT_TYPES.JSON;
        }

        return request;
      },
      (error) => Promise.reject(error),
    );
  }

  private setupResponseInterceptor(): void {
    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(ErrorHandler.handleRequestError(error));
      },
    );
  }
}
