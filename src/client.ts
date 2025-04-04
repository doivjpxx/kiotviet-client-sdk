import axios, { AxiosInstance } from 'axios';
import { KiotVietClientConfig } from './types';
import { API_CONSTANTS } from './config/constants';
import { TokenManager } from './services/token-manager';
import { InterceptorService } from './services/interceptor-service';
import { CustomerHandler } from './resources/customers';
import { ProductHandler } from './resources/products';

export class KiotVietClient {
  private config: Required<KiotVietClientConfig>;
  private tokenManager: TokenManager;
  public readonly apiClient: AxiosInstance;

  // Resource Handlers
  public readonly customers: CustomerHandler;
  public readonly products: ProductHandler;

  constructor(config: KiotVietClientConfig) {
    this.validateConfig(config);
    this.config = this.initializeConfig(config);
    this.apiClient = this.createApiClient();
    this.tokenManager = new TokenManager(this.config);
    
    // Initialize interceptors
    new InterceptorService(
      this.apiClient,
      this.tokenManager,
      this.config.retailerName
    );

    // Initialize resource handlers
    this.customers = new CustomerHandler(this);
    this.products = new ProductHandler(this);
  }

  private validateConfig(config: KiotVietClientConfig): void {
    if (!config.clientId || !config.clientSecret || !config.retailerName) {
      throw new Error('clientId, clientSecret, and retailerName are required');
    }
  }

  private initializeConfig(config: KiotVietClientConfig): Required<KiotVietClientConfig> {
    return {
      ...config,
      baseUrl: config.baseUrl || API_CONSTANTS.DEFAULT_BASE_URL,
      tokenUrl: config.tokenUrl || API_CONSTANTS.DEFAULT_TOKEN_URL,
      apiVersion: config.apiVersion || API_CONSTANTS.DEFAULT_API_VERSION,
      timeout: config.timeout ?? API_CONSTANTS.DEFAULT_TIMEOUT
    } as Required<KiotVietClientConfig>;
  }

  private createApiClient(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseUrl.replace(/\/$/, ''),
      timeout: this.config.timeout
    });
  }

  /**
   * Manually trigger a token refresh
   * @returns Promise<string> The new access token
   */
  public async refreshToken(): Promise<string> {
    return this.tokenManager.refreshToken();
  }
}
