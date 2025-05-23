import { KiotVietListResponse } from './common';
import { WebhookEventDataMapping } from './webhook-payloads';

/**
 * Enum định nghĩa tất cả các loại sự kiện webhook hỗ trợ bởi KiotViet
 */
export enum WebhookEvent {
  // Hàng hóa (Product)
  ProductCreated = 'product.created',
  ProductUpdated = 'product.updated',
  ProductDeleted = 'product.deleted',

  // Danh mục (Category)
  CategoryCreated = 'category.created',
  CategoryUpdated = 'category.updated',
  CategoryDeleted = 'category.deleted',

  // Khách hàng (Customer)
  CustomerCreated = 'customer.created',
  CustomerUpdated = 'customer.updated',
  CustomerDeleted = 'customer.deleted',

  // Đơn hàng (Order)
  OrderCreated = 'order.created',
  OrderUpdated = 'order.updated',
  OrderDeleted = 'order.deleted',

  // Hóa đơn (Invoice)
  InvoiceCreated = 'invoice.created',
  InvoiceUpdated = 'invoice.updated',
  InvoiceDeleted = 'invoice.deleted',

  // Tồn kho (Stock)
  StockUpdated = 'stock.update',

  // Bảng giá (PriceBook)
  PriceBookUpdated = 'pricebook.update',
  PriceBookDeleted = 'pricebook.delete',
  PriceBookDetailUpdated = 'pricebookdetail.update',
  PriceBookDetailDeleted = 'pricebookdetail.delete',

  // Chi nhánh (Branch)
  BranchUpdated = 'branch.update',
  BranchDeleted = 'branch.delete',
}

/**
 * Interface mô tả cấu trúc của một webhook đã đăng ký
 */
export interface Webhook {
  id: number;
  url: string;
  secret: string;
  events: WebhookEvent[];
  isActive: boolean;
  createdDate: string;
  modifiedDate: string;
  retailerId: number;
  description?: string;
  type?: string;
}

/**
 * Interface mô tả tham số để tạo mới webhook
 * Tương ứng với cấu trúc request trong tài liệu:
 * {
 *   "Webhook": {
 *     "Type": string,
 *     "Url": string,
 *     "IsActive": boolean,
 *     "Description": string,
 *     "Secret": string
 *   }
 * }
 */
export interface WebhookCreateParams {
  url: string;
  secret: string;
  events: WebhookEvent[];
  isActive?: boolean;
  description?: string;
  type?: string;
}

export interface WebhookUpdateParams extends Partial<WebhookCreateParams> {
  id: number;
}

export interface WebhookListParams {
  pageSize?: number;
  currentItem?: number;
  isActive?: boolean;
}

export type WebhookListResponse = KiotVietListResponse<Webhook>;

/**
 * Type mapping giữa các event và kiểu dữ liệu tương ứng
 * Được sử dụng để cung cấp type checking và auto-completion khi xử lý webhook
 */
export type WebhookEventDataMap = WebhookEventDataMapping;

/**
 * Interface mô tả cấu trúc chung của tất cả các webhook payload
 */
export interface WebhookPayload<T = any> {
  event: WebhookEvent;
  data: T;
  timestamp: string;
  retailerId: number;
  signature: string;
}

/**
 * Type helper cho webhook payload để hỗ trợ developer xử lý các event khác nhau
 * @example
 * ```typescript
 * // Typescript sẽ tự động gợi ý đúng cấu trúc khi sử dụng type này
 * function handleWebhook(payload: TypedWebhookPayload<WebhookEvent.CustomerUpdated>) {
 *   // payload.data sẽ có kiểu CustomerUpdateWebhookPayload
 *   const customerData = payload.data.Notifications[0].Data[0];
 *   console.log(customerData.Name);
 * }
 * ```
 */
export type TypedWebhookPayload<E extends WebhookEvent> = Omit<WebhookPayload, 'data'> & {
  event: E;
  data: E extends keyof WebhookEventDataMap ? WebhookEventDataMap[E] : any;
};
