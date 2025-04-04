import { KiotVietClient } from '../client';
import {
  PriceBookListParams,
  PriceBookListResponse,
  PriceBookDetailListResponse,
  UpdatePriceDetailParams,
} from '../types/price-book';

export class PriceBookHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List price books with optional filtering and pagination
   * @param params Filter and pagination parameters
   */
  async list(params: PriceBookListParams = {}): Promise<PriceBookListResponse> {
    const response = await this.client.apiClient.get<PriceBookListResponse>('/pricebooks', { params });
    return response.data;
  }

  /**
   * Get price book details by ID
   * @param priceBookId The ID of the price book to retrieve
   */
  async getById(priceBookId: number): Promise<PriceBookDetailListResponse> {
    const response = await this.client.apiClient.get<PriceBookDetailListResponse>(`/pricebooks/${priceBookId}`);
    return response.data;
  }

  /**
   * Update price details for a product in a price book
   * @param data The price detail update data
   */
  async updatePriceDetail(data: UpdatePriceDetailParams): Promise<void> {
    await this.client.apiClient.post('/pricebooks/detail', data);
  }
}
