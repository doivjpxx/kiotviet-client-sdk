import { KiotVietListResponse } from './common';

export interface ReturnProduct {
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
  note?: string;
  usePoint?: boolean;
  subTotal: number;
}

export interface Return {
  id: number;
  code: string;
  invoiceId?: number;
  returnDate: string;
  branchId: number;
  branchName: string;
  receivedById: number;
  soldByName: string;
  customerId?: number;
  customerCode?: string;
  customerName?: string;
  returnTotal: number;
  totalPayment: number;
  returnDiscount?: number;
  returnFee?: number;
  status: number;
  statusValue: string;
  createdDate: string;
  modifiedDate?: string;
  payments?: Array<{
    id: number;
    code: string;
    amount: number;
    method: string;
    status?: number;
    statusValue?: string;
    transDate: string;
    bankAccount?: string;
    accountId?: number;
    description?: string;
  }>;
  returnDetails: ReturnProduct[];
}

export interface ReturnListParams {
  orderBy?: string;
  lastModifiedFrom?: string;
  fromReturnDate?: string;
  toReturnDate?: string;
  pageSize?: number;
  currentItem?: number;
  includePayment?: boolean;
  orderDirection?: 'ASC' | 'DESC';
}

export interface ReturnListResponse extends KiotVietListResponse<Return> {}
