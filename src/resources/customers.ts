import { KiotVietClient } from '../client';
import { KiotVietListResponse, CustomerCreateParams } from '../types';
import { ValidationError } from '../errors';
import { Customer } from '../types';

export class CustomerHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List customers with optional filtering
   * @param params Filter parameters (pageSize, currentItem)
   * Documentation: GET /public/customers
   */
  async list(params: Record<string, any> = {}): Promise<KiotVietListResponse<Customer>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Customer>>('/public/customers', { params });
    return response.data;
  }

  /**
   * Get a customer by their ID
   * @param customerId The ID of the customer to retrieve
   * Documentation: GET /public/customers/{id}
   */
  async getById(customerId: number): Promise<Customer> {
    const response = await this.client.apiClient.get<Customer>(`/public/customers/${customerId}`);
    return response.data;
  }

  /**
   * Create a new customer
   * @param customerData The customer data to create
   * Documentation: POST /public/customers
   */
  async create(customerData: CustomerCreateParams): Promise<Customer> {
    // Validate required fields
    if (!customerData.name) {
      throw new ValidationError('Customer name is required');
    }

    const response = await this.client.apiClient.post<Customer>('/public/customers', customerData);
    return response.data;
  }

  /**
   * Search customers by keyword
   * @param query Search query
   * @param params Additional filter parameters
   */
  async search(query: string, params: Record<string, any> = {}): Promise<KiotVietListResponse<Customer>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Customer>>('/public/customers', {
      params: {
        ...params,
        keyword: query,
      },
    });
    return response.data;
  }

  /**
   * Get customers by group ID
   * @param groupId The ID of the customer group
   * @param params Additional filter parameters
   */
  async getByGroup(groupId: number, params: Record<string, any> = {}): Promise<KiotVietListResponse<Customer>> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Customer>>('/public/customers', {
      params: {
        ...params,
        customerGroupId: groupId,
      },
    });
    return response.data;
  }

  /**
   * Get customer by contact number
   * @param contactNumber The customer's contact number
   */
  async getByContactNumber(contactNumber: string): Promise<Customer | null> {
    const response = await this.client.apiClient.get<KiotVietListResponse<Customer>>('/public/customers', {
      params: {
        contactNumber,
        pageSize: 1,
      },
    });

    return response.data.data.length > 0 ? response.data.data[0] : null;
  }
}
