import { CashFlowListResponse, CashFlowListParams, PaymentRequest, PaymentResponse } from '../types';
import { KiotVietClient } from '../client';

export class CashFlow {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of cash flow records
   * @param params Query parameters for filtering cash flows
   * @returns List of cash flow records
   */
  async list(params?: CashFlowListParams): Promise<CashFlowListResponse> {
    return this.client.get('/cashflow', { params });
  }

  /**
   * Process payment for an invoice
   * @param data Payment details
   * @returns Payment response data
   */
  async processPayment(data: PaymentRequest): Promise<PaymentResponse> {
    return this.client.post('/payments', data);
  }
}
