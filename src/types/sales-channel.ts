import { KiotVietListResponse } from './common';

export interface SalesChannel {
  id: number;
  name: string;
  description?: string;
  retailerId?: number;
  status: boolean;
  createdDate: string;
  modifiedDate?: string;
}

export interface SalesChannelListResponse extends KiotVietListResponse<SalesChannel> {}
