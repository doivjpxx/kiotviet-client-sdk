import { KiotVietListResponse } from './common';

export interface PriceBook {
  id: number;
  code: string;
  name: string;
  description?: string;
  isActive: boolean;
  isGlobal: boolean;
  startDate?: string;
  endDate?: string;
  forAllCusGroup: boolean;
  forAllBranch: boolean;
  forAllUser: boolean;
  retailerId: number;
  createdDate: string;
  modifiedDate?: string;
  priceBookBranches?: PriceBookBranch[];
  priceBookCustomerGroups?: PriceBookCustomerGroup[];
  priceBookUsers?: PriceBookUser[];
}

export interface PriceBookBranch {
  id: number;
  priceBookId: number;
  branchId: number;
  branchName: string;
}

export interface PriceBookCustomerGroup {
  id: number;
  priceBookId: number;
  customerGroupId: number;
  customerGroupName: string;
}

export interface PriceBookUser {
  id: number;
  priceBookId: number;
  userId: number;
  userName: string;
}

export interface PriceBookDetail {
  id: number;
  priceBookId: number;
  productId: number;
  productCode: string;
  productName: string;
  basePrice: number;
  price: number;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  createdDate: string;
  modifiedDate?: string;
}

export interface PriceBookListParams {
  pageSize?: number;
  currentItem?: number;
  includePriceBookBranch?: boolean;
  includePriceBookCustomerGroups?: boolean;
  includePriceBookUsers?: boolean;
  lastModifiedFrom?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  isActive?: boolean;
  branchId?: number;
  customerGroupId?: number;
  productId?: number;
}

export interface PriceBookDetailListParams {
  priceBookId?: number;
  productIds?: number[];
  includeBasePrice?: boolean;
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

export interface PriceBookCreateParams {
  code?: string;
  name: string;
  description?: string;
  isActive?: boolean;
  isGlobal?: boolean;
  startDate?: string;
  endDate?: string;
  forAllCusGroup?: boolean;
  forAllBranch?: boolean;
  forAllUser?: boolean;
  branchIds?: number[];
  customerGroupIds?: number[];
  userIds?: number[];
  details?: Array<{
    productId: number;
    price: number;
  }>;
}

export interface PriceBookUpdateParams extends Partial<Omit<PriceBookCreateParams, 'details'>> {
  id: number;
}

export interface PriceBookDetailUpdateParams {
  priceBookId: number;
  details: Array<{
    productId: number;
    price: number;
  }>;
}

export type PriceBookListResponse = KiotVietListResponse<PriceBook>;
export type PriceBookDetailListResponse = KiotVietListResponse<PriceBookDetail>;
