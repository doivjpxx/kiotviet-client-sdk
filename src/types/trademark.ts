import { KiotVietListResponse } from './common';

export interface Trademark {
  trademarkId: number;
  name: string;
  description?: string;
  status: boolean;
  retailerId?: number;
  createdDate: string;
  modifiedDate?: string;
}

export interface TrademarkListResponse extends KiotVietListResponse<Trademark> {}
