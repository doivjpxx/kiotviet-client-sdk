import { KiotVietClient } from '../client';
import { ReturnListParams, ReturnListResponse, Return } from '../types/return';

export class ReturnsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of returns with optional filtering and pagination
   * @param params Query parameters
   */
  async list(params?: ReturnListParams): Promise<ReturnListResponse> {
    return this.client.get('/returns', { params });
  }

  /**
   * Get return by ID
   * @param id Return ID
   */
  async getById(id: number): Promise<Return> {
    return this.client.get(`/returns/${id}`);
  }

  /**
   * Get return by code
   * @param code Return code
   */
  async getByCode(code: string): Promise<Return> {
    return this.client.get(`/returns/code/${code}`);
  }
}
