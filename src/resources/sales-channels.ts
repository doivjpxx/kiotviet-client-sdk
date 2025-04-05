import { KiotVietClient } from '../client';
import { SalesChannelListResponse } from '../types';

export class SalesChannelsHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * Get list of sales channels
   * @returns SalesChannelListResponse
   */
  async list(): Promise<SalesChannelListResponse> {
    return this.client.get('/salesChannels');
  }
}
