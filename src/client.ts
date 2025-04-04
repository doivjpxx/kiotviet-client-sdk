import axios, { AxiosInstance } from 'axios';
import { KiotVietClientConfig } from './types/common';
import { API_CONSTANTS } from './config/constants';
import { TokenManager } from './services/token-manager';
import { InterceptorService } from './services/interceptor-service';
import { CategoryHandler } from './resources/categories';
import { CustomerHandler } from './resources/customers';
import { ProductHandler } from './resources/products';
import { OrderHandler } from './resources/orders';
import { InvoiceHandler } from './resources/invoices';
import { WebhookHandler } from './resources/webhooks';
import { UserHandler } from './resources/users';
import { PurchaseOrderHandler } from './resources/purchase-orders';
import { BranchHandler } from './resources/branches';
import { BankAccountHandler } from './resources/bank-accounts';
import { PriceBookHandler } from './resources/price-books';
import { SupplierHandler } from './resources/suppliers';
import { TransferHandler } from './resources/transfers';
import { SurchargeHandler } from './resources/surcharges';

export class KiotVietClient {
  private config: Required<KiotVietClientConfig>;
  private tokenManager: TokenManager;
  public readonly apiClient: AxiosInstance;

  // Resource Handlers
  public readonly customers: CustomerHandler;
  public readonly categories: CategoryHandler;
  public readonly orders: OrderHandler;
  public readonly products: ProductHandler;
  public readonly invoices: InvoiceHandler;
  public readonly webhooks: WebhookHandler;
  public readonly users: UserHandler;
  public readonly purchaseOrders: PurchaseOrderHandler;
  public readonly branches: BranchHandler;
  public readonly bankAccounts: BankAccountHandler;
  public readonly priceBooks: PriceBookHandler;
  public readonly suppliers: SupplierHandler;
  public readonly transfers: TransferHandler;
  public readonly surcharges: SurchargeHandler;

  constructor(config: KiotVietClientConfig) {
    this.validateConfig(config);
    this.config = this.initializeConfig(config);
    this.apiClient = this.createApiClient();
    this.tokenManager = new TokenManager(this.config);

    // Initialize interceptors
    new InterceptorService(this.apiClient, this.tokenManager, this.config.retailerName);

    // Initialize resource handlers
    this.customers = new CustomerHandler(this);
    this.categories = new CategoryHandler(this);
    this.orders = new OrderHandler(this);
    this.products = new ProductHandler(this);
    this.invoices = new InvoiceHandler(this);
    this.webhooks = new WebhookHandler(this);
    this.users = new UserHandler(this);
    this.purchaseOrders = new PurchaseOrderHandler(this);
    this.branches = new BranchHandler(this);
    this.bankAccounts = new BankAccountHandler(this);
    this.priceBooks = new PriceBookHandler(this);
    this.suppliers = new SupplierHandler(this);
    this.transfers = new TransferHandler(this);
    this.surcharges = new SurchargeHandler(this);
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
      timeout: config.timeout ?? API_CONSTANTS.DEFAULT_TIMEOUT,
    } as Required<KiotVietClientConfig>;
  }

  private createApiClient(): AxiosInstance {
    return axios.create({
      baseURL: this.config.baseUrl.replace(/\/$/, ''),
      timeout: this.config.timeout,
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
