import { KiotVietListResponse } from './common';

export interface Transfer {
  id: number;
  code: string;
  status: number;
  transferredDate: string;
  receivedDate: string;
  createdById: number;
  createdByName: string;
  fromBranchId: number;
  fromBranchName: string;
  toBranchId: number;
  toBranchName: string;
  noteBySource: string;
  noteByDestination: string;
  details: TransferDetail[];
}

export interface TransferDetail {
  id: number;
  productId: number;
  productCode: string;
  productName: string;
  transferredQuantity: number;
  price: number;
  totalTransfer: number;
  totalReceive: number;
}

export interface TransferListParams {
  toBranchIds?: number[];
  fromBranchIds?: number[];
  status?: number[];
  pageSize?: number;
  currentItem?: number;
  fromReceivedDate?: string;
  toReceivedDate?: string;
  fromTransferDate?: string;
  toTransferDate?: string;
}

export interface CreateTransferParams {
  fromBranchId: number;
  toBranchId: number;
  isDraft?: boolean;
  code?: string;
  description?: string;
  status?: number;
  transferDetails: CreateTransferDetail[];
}

export interface CreateTransferDetail {
  productCode: string;
  productId: number;
  sendQuantity: number;
  receivedQuantity?: number;
  price: number;
}

export type TransferListResponse = KiotVietListResponse<Transfer>;
