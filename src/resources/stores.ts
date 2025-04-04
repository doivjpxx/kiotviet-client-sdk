import { KiotVietClient } from '../client';
import { Store, StoreListParams, StoreListResponse } from '../types/store';

export class StoreHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List stores with optional filtering
   * @param params Filter parameters (pageSize, currentItem, isActive, code, name)
   */
  async list(params: StoreListParams = {}): Promise<StoreListResponse> {
    const response = await this.client.apiClient.get<StoreListResponse>('/stores', { params });
    return response.data;
  }

  /**
   * Get a store by its ID
   * @param storeId The ID of the store to retrieve
   */
  async getById(storeId: number): Promise<Store> {
    const response = await this.client.apiClient.get<Store>(`/stores/${storeId}`);
    return response.data;
  }

  /**
   * Get active stores
   * @param params Additional filter parameters (excluding isActive)
   */
  async getActive(params: Omit<StoreListParams, 'isActive'> = {}): Promise<StoreListResponse> {
    const response = await this.client.apiClient.get<StoreListResponse>('/stores', {
      params: {
        ...params,
        isActive: true,
      },
    });
    return response.data;
  }

  /**
   * Search stores by name or code
   * @param query Search query (matches against name or code)
   * @param params Additional filter parameters (excluding name and code)
   */
  async search(query: string, params: Omit<StoreListParams, 'name' | 'code'> = {}): Promise<StoreListResponse> {
    const response = await this.client.apiClient.get<StoreListResponse>('/stores', {
      params: {
        ...params,
        name: query,
        // The API will match against both name and code when name parameter is provided
      },
    });
    return response.data;
  }
}
