import { KiotVietClient } from '../client';
import { OrderSupplierListParams, OrderSupplierListResponse, OrderSupplier } from '../types/order-supplier';

export class OrderSuppliersHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of order suppliers with optional filtering and pagination
   * @param params Query parameters
   */
  async list(params?: OrderSupplierListParams): Promise<OrderSupplierListResponse> {
    return this.client.get('/ordersuppliers', { params });
  }

  /**
   * Get order supplier by ID
   * @param id Order supplier ID
   */
  async getById(id: number): Promise<OrderSupplier> {
    return this.client.get(`/ordersuppliers/${id}`);
  }
}
