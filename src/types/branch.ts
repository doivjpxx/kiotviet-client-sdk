import { KiotVietListResponse } from './common';

export interface Branch {
  id: number;
  branchId: string;
  name: string;
  address: string;
  wardName?: string;
  districtName?: string;
  cityName?: string;
  phoneNumber?: string;
  email?: string;
  status: 'Active' | 'Inactive';
  isMain: boolean;
  retailerId: number;
  createdDate: string;
  modifiedDate: string;
}

export interface BranchCreateParams {
  branchId: string;
  name: string;
  address: string;
  wardName?: string;
  districtName?: string;
  cityName?: string;
  phoneNumber?: string;
  email?: string;
  status?: 'Active' | 'Inactive';
}

export interface BranchUpdateParams extends Partial<BranchCreateParams> {
  id: number;
}

export interface BranchListParams {
  pageSize?: number;
  currentItem?: number;
  status?: 'Active' | 'Inactive';
  isMain?: boolean;
}

export type BranchListResponse = KiotVietListResponse<Branch>;
