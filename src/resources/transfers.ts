import { KiotVietClient } from '../client';
import { Transfer, TransferListParams, TransferListResponse, CreateTransferParams } from '../types/transfer';

export class TransferHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of transfers with optional filtering and pagination
   * @param params Query parameters
   */
  async list(params: TransferListParams = {}): Promise<TransferListResponse> {
    const response = await this.client.apiClient.get<TransferListResponse>('/transfers', { params });
    return response.data;
  }

  /**
   * Get transfer by ID
   * @param id Transfer ID
   */
  async getById(id: number): Promise<Transfer> {
    const response = await this.client.apiClient.get<Transfer>(`/transfers/${id}`);
    return response.data;
  }

  /**
   * Create a new transfer
   * @param data Transfer creation data
   */
  async create(data: CreateTransferParams): Promise<Transfer> {
    const response = await this.client.apiClient.post<Transfer>('/transfers', data);
    return response.data;
  }

  /**
   * Update transfer by ID
   * @param id Transfer ID
   * @param data Transfer update data
   */
  async update(id: number, data: CreateTransferParams): Promise<Transfer> {
    const response = await this.client.apiClient.put<Transfer>(`/transfers/${id}`, data);
    return response.data;
  }

  /**
   * Delete transfer by ID
   * @param id Transfer ID
   */
  async delete(id: number): Promise<void> {
    await this.client.apiClient.delete(`/transfers/${id}`);
  }
}
