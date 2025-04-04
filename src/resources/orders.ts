import { KiotVietClient } from '../client'
import {
  Order,
  OrderCreateParams,
  OrderUpdateParams,
  OrderListParams,
  OrderListResponse,
  OrderStatus,
} from '../types/order'

export class OrderHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List orders with optional filtering
   * @param params Filter parameters
   */
  async list(params: OrderListParams = {}): Promise<OrderListResponse> {
    const response = await this.client.apiClient.get<OrderListResponse>('/orders', { params })
    return response.data
  }

  /**
   * Get an order by its ID
   * @param orderId The ID of the order to retrieve
   */
  async getById(orderId: number): Promise<Order> {
    const response = await this.client.apiClient.get<Order>(`/orders/${orderId}`)
    return response.data
  }

  /**
   * Create a new order
   * @param orderData The order data to create
   */
  async create(orderData: OrderCreateParams): Promise<Order> {
    const response = await this.client.apiClient.post<Order>('/orders', orderData)
    return response.data
  }

  /**
   * Update an existing order
   * @param orderId The ID of the order to update
   * @param orderData The order data to update
   */
  async update(orderId: number, orderData: Partial<OrderUpdateParams>): Promise<Order> {
    const response = await this.client.apiClient.put<Order>(`/orders/${orderId}`, {
      id: orderId,
      ...orderData,
    })
    return response.data
  }

  /**
   * Cancel an order
   * @param orderId The ID of the order to cancel
   * @param reason Optional cancellation reason
   */
  async cancel(orderId: number, reason?: string): Promise<Order> {
    const response = await this.client.apiClient.put<Order>(`/orders/${orderId}`, {
      id: orderId,
      status: OrderStatus.Cancelled,
      description: reason,
    })
    return response.data
  }

  /**
   * Get orders by date range
   * @param fromDate Start date (YYYY-MM-DD)
   * @param toDate End date (YYYY-MM-DD)
   * @param params Additional filter parameters
   */
  async getByDateRange(
    fromDate: string,
    toDate: string,
    params: Omit<OrderListParams, 'fromPurchaseDate' | 'toPurchaseDate'> = {},
  ): Promise<OrderListResponse> {
    const response = await this.client.apiClient.get<OrderListResponse>('/orders', {
      params: {
        ...params,
        fromPurchaseDate: fromDate,
        toPurchaseDate: toDate,
      },
    })
    return response.data
  }

  /**
   * Get orders by customer
   * @param customerIdentifier Customer's phone number or code
   * @param params Additional filter parameters
   */
  async getByCustomer(
    customerIdentifier: string,
    params: Omit<OrderListParams, 'customerPhone' | 'customerCode'> = {},
  ): Promise<OrderListResponse> {
    // Try to determine if the identifier is a phone number
    const isPhone = /^\d+$/.test(customerIdentifier)

    const response = await this.client.apiClient.get<OrderListResponse>('/orders', {
      params: {
        ...params,
        ...(isPhone ? { customerPhone: customerIdentifier } : { customerCode: customerIdentifier }),
      },
    })
    return response.data
  }
}
