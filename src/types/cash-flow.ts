import { KiotVietListResponse } from './common';
export interface CashFlow {
  id: number;
  code: string;
  documentCode?: string;
  branchId: number;
  branchName?: string;
  address?: string;
  wardName?: string;
  contactNumber?: string;
  createdDate: string;
  modifiedDate?: string;
  createdBy: number;
  usedForFinancialReporting: number;
  cashFlowGroupId?: number;
  cashFlowGroupName?: string;
  method: string;
  partnerType: string;
  partnerId?: number;
  status: number;
  statusValue: string;
  transDate: string;
  amount: number;
  partnerName: string;
  user: string;
  accountId?: number;
  accountName?: string;
  description?: string;
  receiptType?: number;
  receiptTypeValue?: string;
  documentType?: number;
  documentTypeValue?: string;
  locationName?: string;
  debt?: number;
  isReceipt?: boolean;
  retailerId: number;
}

export interface CashFlowListParams {
  branchIds?: number[];
  code?: string[];
  userId?: number;
  accountId?: number;
  partnerType?: string;
  method?: string[];
  cashFlowGroupId?: number[];
  usedForFinancialReporting?: number;
  partnerName?: string;
  contactNumber?: string;
  isReceipt?: boolean;
  includeAccount?: boolean;
  includeBranch?: boolean;
  includeUser?: boolean;
  startDate?: string;
  endDate?: string;
  status?: number;
  ids?: number[];
  pageSize?: number;
  currentItem?: number;
}

export interface CashFlowCreateParams {
  branchId: number;
  accountId?: number;
  amount: number;
  cashFlowGroupId?: number;
  contactNumber?: string;
  transDate?: string;
  description?: string;
  partnerType?: string;
  partnerId?: number;
  address?: string;
  wardName?: string;
  documentType?: number;
  usedForFinancialReporting?: number;
  isReceipt?: boolean;
  method?: string;
  partnerName?: string;
}

export interface CashFlowUpdateParams extends Partial<CashFlowCreateParams> {
  id: number;
}

export type CashFlowListResponse = KiotVietListResponse<CashFlow>;
