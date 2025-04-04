import { KiotVietClient } from '../client'
import {
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
  CategoryListParams,
  CategoryListResponse,
} from '../types/category'

export class CategoryHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List categories with optional filtering and pagination
   * @param params Filter and pagination parameters
   */
  async list(params: CategoryListParams = {}): Promise<CategoryListResponse> {
    const response = await this.client.apiClient.get<CategoryListResponse>('/categories', { params })
    return response.data
  }

  /**
   * Get a category by its ID
   * @param categoryId The ID of the category to retrieve
   */
  async getById(categoryId: number): Promise<Category> {
    const response = await this.client.apiClient.get<Category>(`/categories/${categoryId}`)
    return response.data
  }

  /**
   * Create a new category
   * @param categoryData The category data to create
   */
  async create(categoryData: CategoryCreateParams): Promise<Category> {
    const response = await this.client.apiClient.post<Category>('/categories', categoryData)
    return response.data
  }

  /**
   * Update an existing category
   * @param categoryId The ID of the category to update
   * @param categoryData The category data to update
   */
  async update(categoryId: number, categoryData: Partial<CategoryUpdateParams>): Promise<Category> {
    const response = await this.client.apiClient.put<Category>(`/categories/${categoryId}`, categoryData)
    return response.data
  }

  /**
   * Delete a category
   * @param categoryId The ID of the category to delete
   */
  async delete(categoryId: number): Promise<void> {
    await this.client.apiClient.delete(`/categories/${categoryId}`)
  }

  /**
   * Get categories with hierarchical structure
   * @param params Filter and pagination parameters
   */
  async getHierarchical(params: Omit<CategoryListParams, 'hierarchicalData'> = {}): Promise<CategoryListResponse> {
    const response = await this.client.apiClient.get<CategoryListResponse>('/categories', {
      params: {
        ...params,
        hierarchicalData: true,
      },
    })
    return response.data
  }
}
