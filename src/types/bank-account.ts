import { KiotVietListResponse } from './common';

export interface BankAccount {
  id: number;
  name: string;
  accountNumber: string;
  bankName: string;
  branchName?: string;
  accountHolder: string;
  description?: string;
  status: 'Active' | 'Inactive';
  retailerId: number;
  createdDate: string;
  modifiedDate: string;
}

export interface BankAccountListParams {
  pageSize?: number;
  currentItem?: number;
  status?: 'Active' | 'Inactive';
}

export type BankAccountListResponse = KiotVietListResponse<BankAccount>;
