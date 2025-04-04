import { KiotVietListResponse } from './common'

export interface OrderProduct {
  productId: number
  productCode: string
  productName: string
  quantity: number
  price: number
  discount?: number
  note?: string
}

export interface Order {
  id: number
  code: string
  purchaseDate: string
  branchId: number
  branchName: string
  customerId?: number
  customerCode?: string
  customerName?: string
  total: number
  discount?: number
  description?: string
  status: number
  statusValue: string
  orderDetails: OrderProduct[]
  retailerId: number
  soldById?: number
  soldByName?: string
  modifiedDate: string
  createdDate: string
}

export interface OrderCreateParams {
  branchId: number
  customerId?: number
  orderDetails: Array<{
    productId: number
    quantity: number
    price: number
    discount?: number
    note?: string
  }>
  description?: string
  discount?: number
  makeInvoice?: boolean
}

export interface OrderUpdateParams extends Partial<Omit<OrderCreateParams, 'makeInvoice'>> {
  id: number
}

export interface OrderListParams {
  pageSize?: number
  currentItem?: number
  status?: number
  fromPurchaseDate?: string
  toPurchaseDate?: string
  customerPhone?: string
  customerCode?: string
  orderCode?: string
}

export interface OrderStatusCount {
  status: number
  statusValue: string
  count: number
}

export interface OrderListResponse extends KiotVietListResponse<Order> {
  statusCount?: OrderStatusCount[]
}

export enum OrderStatus {
  Draft = 1,
  Processing = 2,
  Completed = 3,
  Cancelled = 4,
}
