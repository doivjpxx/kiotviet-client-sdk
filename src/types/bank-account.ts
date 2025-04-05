import { KiotVietListResponse } from './common';

export interface BankAccount {
  id: number;
  accountNumber: string;
  accountName: string;
  bankId: number;
  bankName: string;
  branchName?: string;
  accountHolder: string;
  description?: string;
  isActive: boolean;
  retailerId: number;
  createdBy?: number;
  createdDate: string;
  modifiedDate?: string;
  balance?: number;
  bankCode?: string;
}

export interface BankAccountListParams {
  bankId?: number;
  pageSize?: number;
  currentItem?: number;
  lastModifiedFrom?: string;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  includeBalance?: boolean;
  includeBank?: boolean;
  isActive?: boolean;
}

export interface BankAccountCreateParams {
  accountNumber: string;
  accountName: string;
  bankId: number;
  branchName?: string;
  accountHolder: string;
  description?: string;
  isActive?: boolean;
}

export interface BankAccountUpdateParams extends Partial<BankAccountCreateParams> {
  id: number;
}

export type BankAccountListResponse = KiotVietListResponse<BankAccount>;
