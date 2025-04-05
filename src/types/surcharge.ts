import { KiotVietListResponse } from './common';

export interface Surcharge {
  id: number;
  code: string;
  name: string;
  value: number;
  isPercent: boolean;
  isAutoAdd: boolean;
  isRequired: boolean;
  description?: string;
  isActive: boolean;
  retailerId: number;
  branchId?: number;
  branchIds?: number[];
  createdBy?: string;
  createdDate: string;
  modifiedDate?: string;
}

export interface SurchargeCreateParams {
  code?: string;
  name: string;
  value: number;
  isPercent: boolean;
  isAutoAdd?: boolean;
  isRequired?: boolean;
  description?: string;
  branchIds?: number[];
  isActive?: boolean;
}

export interface SurchargeUpdateParams extends Partial<SurchargeCreateParams> {
  id: number;
}

export interface SurchargeListParams {
  pageSize?: number;
  currentItem?: number;
  lastModifiedFrom?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  isActive?: boolean;
  branchId?: number;
  includeRemoveIds?: boolean;
  code?: string;
  name?: string;
}

export type SurchargeListResponse = KiotVietListResponse<Surcharge>;
