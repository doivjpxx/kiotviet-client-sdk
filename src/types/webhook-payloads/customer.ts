import { WebhookEvent } from '../webhook';

/**
 * Interface mô tả dữ liệu khách hàng trong webhook customer.update
 */
export interface CustomerWebhookData {
  Id: number;
  Code: string;
  Name: string;
  Gender?: boolean;
  BirthDate?: string;
  ContactNumber?: string;
  Address?: string;
  LocationName?: string;
  Email?: string;
  ModifiedDate: string;
  Type?: number;
  Organization?: string;
  TaxCode?: string;
  Comments?: string;
}

/**
 * Interface mô tả cấu trúc payload cho webhook customer.update
 */
export interface CustomerUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: CustomerWebhookData[];
  }>;
}

/**
 * Type helper để làm việc với webhook customer.update
 */
export type CustomerWebhookEventTypes = {
  [WebhookEvent.CustomerCreated]: CustomerUpdateWebhookPayload;
  [WebhookEvent.CustomerUpdated]: CustomerUpdateWebhookPayload;
  [WebhookEvent.CustomerDeleted]: CustomerUpdateWebhookPayload;
};
