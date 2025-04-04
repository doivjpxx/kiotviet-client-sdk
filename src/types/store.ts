import { KiotVietListResponse } from './common';

export interface Store {
  id: number;
  code: string;
  name: string;
  address: string;
  locationName?: string;
  wardName?: string;
  phoneNumber?: string;
  email?: string;
  latitude?: number;
  longitude?: number;
  retailerId: number;
  isActive: boolean;
  createdDate: string;
  modifiedDate: string;
}

export interface StoreListParams {
  pageSize?: number;
  currentItem?: number;
  isActive?: boolean;
  code?: string;
  name?: string;
}

export type StoreListResponse = KiotVietListResponse<Store>;

// Since the API only allows reading store information,
// we don't need CreateParams or UpdateParams interfaces
