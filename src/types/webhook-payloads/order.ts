import { WebhookEvent } from '../webhook';

/**
 * Interface mô tả chi tiết đơn hàng trong webhook order.update
 */
export interface OrderDetailWebhookData {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  Quantity: number;
  Price: number;
  Discount?: number;
  DiscountRatio?: number;
}

/**
 * Interface mô tả dữ liệu đơn hàng trong webhook order.update
 */
export interface OrderWebhookData {
  Id: number;
  Code: string;
  PurchaseDate: string;
  BranchId: number;
  SoldById?: number;
  SoldByName: string;
  CustomerId?: number;
  CustomerCode: string;
  CustomerName: string;
  Total: number;
  TotalPayment: number;
  Discount?: number;
  DiscountRatio?: number;
  Status: number;
  StatusValue: string;
  Description: string;
  UsingCod: boolean;
  ModifiedDate?: string;
  OrderDetails: OrderDetailWebhookData[];
}

/**
 * Interface mô tả cấu trúc payload cho webhook order.update
 */
export interface OrderUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: OrderWebhookData[];
  }>;
}

/**
 * Interface mô tả thông tin đối tác giao hàng trong webhook invoice.update
 */
export interface PartnerDeliveryWebhookData {
  Code: string;
  Name: string;
  ContactNumber: string;
  Address: string;
  Email: string;
}

/**
 * Interface mô tả thông tin giao hàng trong webhook invoice.update
 */
export interface InvoiceDeliveryWebhookData {
  DeliveryCode: string;
  Status: number; // 1: chưa giao hàng, 2: đang giao hàng, 3: đã giao hàng, 4: đang chuyển hoàn, 5 đã chuyển hoàn, 6: đã hủy
  StatusValue: string;
  Type?: number;
  Price?: number;
  Receiver: string;
  ContactNumber: string;
  Address: string;
  LocationId?: number;
  LocationName: string;
  Weight?: number;
  Length?: number;
  Width?: number;
  Height?: number;
  PartnerDeliveryId?: number;
  PartnerDelivery?: PartnerDeliveryWebhookData;
}

/**
 * Interface mô tả chi tiết hóa đơn trong webhook invoice.update
 */
export interface InvoiceDetailWebhookData {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  Quantity: number;
  Price: number;
  Discount?: number;
  DiscountRatio?: number;
}

/**
 * Interface mô tả thông tin thanh toán trong webhook invoice.update
 */
export interface PaymentWebhookData {
  Id: number;
  Code: string;
  Amount: number;
  AccountId?: number;
  BankAccount: string;
  Description: string;
  Method: string;
  Status?: number;
  StatusValue: string;
  TransDate: string;
}

/**
 * Interface mô tả dữ liệu hóa đơn trong webhook invoice.update
 */
export interface InvoiceWebhookData {
  Id: number;
  Code: string;
  PurchaseDate: string;
  BranchId: number;
  BranchName: string;
  SoldById: number;
  SoldByName: string;
  CustomerId?: number;
  CustomerCode: string;
  CustomerName: string;
  Total: number;
  TotalPayment: number;
  Discount?: number;
  DiscountRatio?: number;
  Status: number; // 1: hoàn thành, 2: đã hủy, 3: đang xử lý: 5: không giao được
  StatusValue: string;
  Description: string;
  UsingCod: boolean;
  ModifiedDate?: string;
  InvoiceDelivery?: InvoiceDeliveryWebhookData;
  InvoiceDetails: InvoiceDetailWebhookData[];
  Payments?: PaymentWebhookData[];
}

/**
 * Interface mô tả cấu trúc payload cho webhook invoice.update
 */
export interface InvoiceUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: InvoiceWebhookData[];
  }>;
}

/**
 * Type helper để làm việc với webhook đơn hàng và hóa đơn
 */
export type OrderInvoiceWebhookEventTypes = {
  [WebhookEvent.OrderCreated]: OrderUpdateWebhookPayload;
  [WebhookEvent.OrderUpdated]: OrderUpdateWebhookPayload;
  [WebhookEvent.InvoiceCreated]: InvoiceUpdateWebhookPayload;
  [WebhookEvent.InvoiceUpdated]: InvoiceUpdateWebhookPayload;
};
