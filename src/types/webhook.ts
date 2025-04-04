import { KiotVietListResponse } from './common';

export enum WebhookEvent {
  ProductCreated = 'product.created',
  ProductUpdated = 'product.updated',
  ProductDeleted = 'product.deleted',
  CategoryCreated = 'category.created',
  CategoryUpdated = 'category.updated',
  CategoryDeleted = 'category.deleted',
  CustomerCreated = 'customer.created',
  CustomerUpdated = 'customer.updated',
  CustomerDeleted = 'customer.deleted',
  OrderCreated = 'order.created',
  OrderUpdated = 'order.updated',
  OrderDeleted = 'order.deleted',
  InvoiceCreated = 'invoice.created',
  InvoiceUpdated = 'invoice.updated',
  InvoiceDeleted = 'invoice.deleted',
}

export interface Webhook {
  id: number;
  url: string;
  secret: string;
  events: WebhookEvent[];
  isActive: boolean;
  createdDate: string;
  modifiedDate: string;
  retailerId: number;
}

export interface WebhookCreateParams {
  url: string;
  secret: string;
  events: WebhookEvent[];
  isActive?: boolean;
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

export interface WebhookPayload<T = any> {
  event: WebhookEvent;
  data: T;
  timestamp: string;
  retailerId: number;
  signature: string;
}
