import { KiotVietListResponse } from './common'
import { OrderProduct } from './order'

export interface InvoicePayment {
  amount: number
  method: number
  methodStr?: string
  status?: number
  refNumber?: string
  bankName?: string
  bankAccountId?: number
}

export interface Invoice {
  id: number
  code: string
  purchaseDate: string
  branchId: number
  branchName: string
  customerId?: number
  customerCode?: string
  customerName?: string
  total: number
  totalPayment: number
  discount?: number
  description?: string
  status: number
  statusValue: string
  invoiceDetails: OrderProduct[]
  payments: InvoicePayment[]
  retailerId: number
  soldById?: number
  soldByName?: string
  modifiedDate: string
  createdDate: string
  orderId?: number
  orderCode?: string
}

export interface InvoiceCreateParams {
  branchId: number
  customerId?: number
  invoiceDetails: Array<{
    productId: number
    quantity: number
    price: number
    discount?: number
    note?: string
  }>
  description?: string
  discount?: number
  orderId?: number
  payments?: Array<{
    amount: number
    method: number
    refNumber?: string
    bankAccountId?: number
  }>
}

export interface InvoiceUpdateParams extends Partial<Omit<InvoiceCreateParams, 'orderId'>> {
  id: number
}

export interface InvoiceListParams {
  pageSize?: number
  currentItem?: number
  status?: number
  fromPurchaseDate?: string
  toPurchaseDate?: string
  customerPhone?: string
  customerCode?: string
  invoiceCode?: string
  orderId?: number
}

export interface InvoiceStatusCount {
  status: number
  statusValue: string
  count: number
}

export interface InvoiceListResponse extends KiotVietListResponse<Invoice> {
  statusCount?: InvoiceStatusCount[]
}

export enum InvoiceStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}

export enum PaymentMethod {
  Cash = 1,
  Card = 2,
  BankTransfer = 3,
  MobilePayment = 4,
  Mixed = 5,
}
