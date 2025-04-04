import { KiotVietClient } from '../client';
import {
  User,
  UserListParams,
  UserListResponse,
  UserRole
} from '../types/user';

export class UserHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List users with optional filtering
   * @param params Filter parameters
   */
  async list(params: UserListParams = {}): Promise<UserListResponse> {
    const response = await this.client.apiClient.get<UserListResponse>(
      '/users',
      { params }
    );
    return response.data;
  }

  /**
   * Get a user by their ID
   * @param userId The ID of the user to retrieve
   */
  async getById(userId: number): Promise<User> {
    const response = await this.client.apiClient.get<User>(`/users/${userId}`);
    return response.data;
  }

  /**
   * Get active users
   * @param params Additional filter parameters (excluding isActive)
   */
  async getActive(params: Omit<UserListParams, 'isActive'> = {}): Promise<UserListResponse> {
    const response = await this.client.apiClient.get<UserListResponse>(
      '/users',
      {
        params: {
          ...params,
          isActive: true
        }
      }
    );
    return response.data;
  }

  /**
   * Get users by branch
   * @param branchId The ID of the branch to filter by
   * @param params Additional filter parameters (excluding branchId)
   */
  async getByBranch(
    branchId: number,
    params: Omit<UserListParams, 'branchId'> = {}
  ): Promise<UserListResponse> {
    const response = await this.client.apiClient.get<UserListResponse>(
      '/users',
      {
        params: {
          ...params,
          branchId
        }
      }
    );
    return response.data;
  }

  /**
   * Get users by role
   * @param roleId The role ID to filter by
   * @param params Additional filter parameters (excluding roleId)
   */
  async getByRole(
    roleId: UserRole,
    params: Omit<UserListParams, 'roleId'> = {}
  ): Promise<UserListResponse> {
    const response = await this.client.apiClient.get<UserListResponse>(
      '/users',
      {
        params: {
          ...params,
          roleId
        }
      }
    );
    return response.data;
  }

  /**
   * Search users by name or code
   * @param query Search query (matches against name or code)
   * @param params Additional filter parameters (excluding name and code)
   */
  async search(
    query: string,
    params: Omit<UserListParams, 'name' | 'code'> = {}
  ): Promise<UserListResponse> {
    const response = await this.client.apiClient.get<UserListResponse>(
      '/users',
      {
        params: {
          ...params,
          name: query
          // The API will match against both name and code when name parameter is provided
        }
      }
    );
    return response.data;
  }
}