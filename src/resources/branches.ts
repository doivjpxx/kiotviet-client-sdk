import { KiotVietClient } from '../client';
import { Branch, BranchCreateParams, BranchUpdateParams, BranchListParams, BranchListResponse } from '../types/branch';

export class BranchHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List branches with optional filtering and pagination
   * @param params Filter and pagination parameters
   */
  async list(params: BranchListParams = {}): Promise<BranchListResponse> {
    const response = await this.client.apiClient.get<BranchListResponse>('/branches', { params });
    return response.data;
  }

  /**
   * Get a branch by its ID
   * @param branchId The ID of the branch to retrieve
   */
  async getById(branchId: number): Promise<Branch> {
    const response = await this.client.apiClient.get<Branch>(`/branches/${branchId}`);
    return response.data;
  }

  /**
   * Create a new branch
   * @param branchData The branch data to create
   */
  async create(branchData: BranchCreateParams): Promise<Branch> {
    const response = await this.client.apiClient.post<Branch>('/branches', branchData);
    return response.data;
  }

  /**
   * Update an existing branch
   * @param branchId The ID of the branch to update
   * @param branchData The branch data to update
   */
  async update(branchId: number, branchData: Partial<BranchUpdateParams>): Promise<Branch> {
    const response = await this.client.apiClient.put<Branch>(`/branches/${branchId}`, branchData);
    return response.data;
  }

  /**
   * Delete a branch
   * @param branchId The ID of the branch to delete
   */
  async delete(branchId: number): Promise<void> {
    await this.client.apiClient.delete(`/branches/${branchId}`);
  }
}
