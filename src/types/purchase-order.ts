import { KiotVietListResponse } from './common';

export interface PurchaseOrderProduct {
  productId: number;
  productCode: string;
  productName: string;
  quantity: number;
  price: number;
  discount?: number;
  note?: string;
}

export interface PurchaseOrder {
  id: number;
  code: string;
  purchaseDate: string;
  branchId: number;
  branchName: string;
  supplierId?: number;
  supplierCode?: string;
  supplierName?: string;
  total: number;
  discount?: number;
  description?: string;
  status: number;
  statusValue: string;
  purchaseOrderDetails: PurchaseOrderProduct[];
  retailerId: number;
  createdById?: number;
  createdByName?: string;
  modifiedDate: string;
  createdDate: string;
}

export interface PurchaseOrderCreateParams {
  branchId: number;
  supplierId?: number;
  purchaseOrderDetails: Array<{
    productId: number;
    quantity: number;
    price: number;
    discount?: number;
    note?: string;
  }>;
  description?: string;
  discount?: number;
  purchaseDate?: string;
}

export interface PurchaseOrderUpdateParams extends Partial<PurchaseOrderCreateParams> {
  id: number;
}

export interface PurchaseOrderListParams {
  pageSize?: number;
  currentItem?: number;
  status?: number;
  fromPurchaseDate?: string;
  toPurchaseDate?: string;
  supplierCode?: string;
  code?: string;
}

export interface PurchaseOrderStatusCount {
  status: number;
  statusValue: string;
  count: number;
}

export interface PurchaseOrderListResponse extends KiotVietListResponse<PurchaseOrder> {
  statusCount?: PurchaseOrderStatusCount[];
}

export enum PurchaseOrderStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}
