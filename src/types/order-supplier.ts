import { KiotVietListResponse } from './common';

export interface OrderSupplierProduct {
  id: number;
  orderSupplierId: number;
  productId: number;
  quantity: number;
  price: number;
  discount: number;
  allocation: number;
  createdDate: string;
  description?: string;
  orderByNumber?: number;
  allocationSuppliers?: number;
  allocationThirdParty?: number;
  orderQuantity: number;
  subTotal: number;
}

export interface OrderSupplierExpense {
  id: number;
  form?: number;
  expensesOtherOrder?: number;
  expensesOtherCode: string;
  expensesOtherName: string;
  expensesOtherId: number;
  orderSupplierId?: number;
  price: number;
  isReturnAuto?: boolean;
  exValue?: number;
  createdDate: string;
}

export interface OrderSupplier {
  id: number;
  code: string;
  invoiceId?: number;
  orderDate: string;
  branchId: number;
  retailerId: number;
  userId: number;
  description?: string;
  status: number;
  discountRatio?: string;
  productQty?: number;
  discount?: number;
  createdDate: string;
  createdBy: number;
  orderSupplierDetails: OrderSupplierProduct[];
  orderSupplierExpensesOthers?: OrderSupplierExpense[];
  total: number;
  exReturnSuppliers?: number;
  exReturnThirdParty?: number;
  totalAmt?: number;
  totalQty?: number;
  totalQuantity: number;
  subTotal: number;
  paidAmount: number;
  toComplete: boolean;
  statusValue: string;
  viewPrice: boolean;
  supplierDebt: number;
  supplierOldDebt: number;
  purchaseOrderCodes?: string;
}

export interface OrderSupplierListParams {
  branchId?: number;
  status?: number;
  productKey?: string;
  supplierKey?: string;
  userNameKey?: string;
  userNameCreatedKey?: string;
  expensesOthersIds?: string;
  descriptionKey?: string;
  codeKey?: string;
  purchaseOrderCode?: string;
  pageSize?: number;
  currentItem?: number;
}

export interface OrderSupplierListResponse extends KiotVietListResponse<OrderSupplier> {}
