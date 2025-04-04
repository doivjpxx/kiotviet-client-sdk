import { KiotVietClient } from '../client';
import { BankAccount, BankAccountListParams, BankAccountListResponse } from '../types/bank-account';

export class BankAccountHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List bank accounts with optional filtering and pagination
   * @param params Filter and pagination parameters
   */
  async list(params: BankAccountListParams = {}): Promise<BankAccountListResponse> {
    const response = await this.client.apiClient.get<BankAccountListResponse>('/bankaccounts', { params });
    return response.data;
  }

  /**
   * Get a bank account by its ID
   * @param accountId The ID of the bank account to retrieve
   */
  async getById(accountId: number): Promise<BankAccount> {
    const response = await this.client.apiClient.get<BankAccount>(`/bankaccounts/${accountId}`);
    return response.data;
  }
}
