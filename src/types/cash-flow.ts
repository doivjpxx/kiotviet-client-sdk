import { KiotVietListResponse } from './common';
export interface CashFlow {
  id: number;
  code: string;
  address?: string;
  branchId: number;
  wardName?: string;
  contactNumber?: string;
  createdBy: number;
  usedForFinancialReporting: number;
  cashFlowGroupId?: number;
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
  description?: string;
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

export interface PaymentRequest {
  amount: number;
  method: string; // Cash, Card, Transfer
  accountId?: number; // Required for Card/Transfer payments
  invoiceId: number;
}

export interface PaymentResponse {
  paymentId: number;
  paymentCode: string;
  amount: number;
  method: string;
  accountId?: number;
  invoiceId: number;
  documentCode: number;
}

export type CashFlowListResponse = KiotVietListResponse<CashFlow>;
