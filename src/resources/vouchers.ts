import { KiotVietClient } from '../client';
import {
  VoucherListParams,
  VoucherListResponse,
  VoucherCampaignListParams,
  VoucherCampaignListResponse,
  VoucherCampaign,
  VoucherCampaignCreateParams,
  VoucherCampaignUpdateParams,
  Voucher,
} from '../types/voucher';

export class VouchersHandler {
  constructor(private client: KiotVietClient) {}

  async listCampaigns(params?: VoucherCampaignListParams): Promise<VoucherCampaignListResponse> {
    return this.client.get('/vouchers/campaigns', { params });
  }

  async getCampaign(id: number): Promise<VoucherCampaign> {
    return this.client.get(`/vouchers/campaigns/${id}`);
  }

  async createCampaign(data: VoucherCampaignCreateParams): Promise<VoucherCampaign> {
    return this.client.post('/vouchers/campaigns', data);
  }

  async updateCampaign(data: VoucherCampaignUpdateParams): Promise<VoucherCampaign> {
    return this.client.put(`/vouchers/campaigns/${data.id}`, data);
  }

  async deleteCampaign(id: number): Promise<void> {
    return this.client.delete(`/vouchers/campaigns/${id}`);
  }

  async list(params?: VoucherListParams): Promise<VoucherListResponse> {
    return this.client.get('/vouchers', { params });
  }

  async get(id: number): Promise<Voucher> {
    return this.client.get(`/vouchers/${id}`);
  }

  async getByCode(code: string): Promise<Voucher> {
    return this.client.get(`/vouchers/code/${code}`);
  }
}
