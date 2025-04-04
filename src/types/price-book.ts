import { KiotVietListResponse } from './common';

export interface PriceBook {
  id: number;
  name: string;
  isActive: boolean;
  isGlobal: boolean;
  startDate?: string;
  endDate?: string;
  forAllCusGroup: boolean;
  forAllUser: boolean;
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
  productId: number;
  productCode: string;
  price: number;
}

export interface PriceBookListParams {
  pageSize?: number;
  currentItem?: number;
  includePriceBookBranch?: boolean;
  includePriceBookCustomerGroups?: boolean;
  includePriceBookUsers?: boolean;
  lastModifiedFrom?: string;
}

export interface UpdatePriceDetailParams {
  pricebookId: number;
  productId: number;
  price: number;
}

export type PriceBookListResponse = KiotVietListResponse<PriceBook>;
export type PriceBookDetailListResponse = KiotVietListResponse<PriceBookDetail>;
