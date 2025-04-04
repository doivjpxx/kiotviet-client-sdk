import { KiotVietClient } from '../client';
import { Supplier, SupplierListParams, SupplierListResponse } from '../types/supplier';

export class SupplierHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of suppliers with optional filtering and pagination
   * @param params Query parameters
   */
  async list(params: SupplierListParams = {}): Promise<SupplierListResponse> {
    const response = await this.client.apiClient.get<SupplierListResponse>('/suppliers', { params });
    return response.data;
  }

  /**
   * Get supplier by ID
   * @param id Supplier ID
   */
  async getById(id: number): Promise<Supplier> {
    const response = await this.client.apiClient.get<{ data: Supplier }>(`/suppliers/${id}`);
    return response.data.data;
  }

  /**
   * Get supplier by code
   * @param code Supplier code
   */
  async getByCode(code: string): Promise<Supplier> {
    const response = await this.client.apiClient.get<{ data: Supplier }>(`/suppliers/code/${code}`);
    return response.data.data;
  }
}
