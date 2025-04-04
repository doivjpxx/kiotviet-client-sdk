import { KiotVietListResponse } from './common';

export interface Surcharge {
  id: number;
  code: string;
  name: string;
  value: number;
  isPercent: boolean;
  description?: string;
  status: 'Active' | 'Inactive';
  retailerId: number;
  branchId: number;
  createdDate: string;
  modifiedDate: string;
}

export interface SurchargeCreateParams {
  code: string;
  name: string;
  value: number;
  isPercent: boolean;
  description?: string;
  branchId?: number;
  status?: 'Active' | 'Inactive';
}

export interface SurchargeUpdateParams extends Partial<SurchargeCreateParams> {
  id: number;
}

export interface SurchargeListParams {
  pageSize?: number;
  currentItem?: number;
  status?: 'Active' | 'Inactive';
  branchId?: number;
  searchText?: string;
}

export type SurchargeListResponse = KiotVietListResponse<Surcharge>;