export * from './customer';
export * from './product';
export * from './order';
export * from './category-branch';
export * from './pricebook';

// Export các type helpers cho tất cả các event type
import { CustomerWebhookEventTypes } from './customer';
import { ProductWebhookEventTypes } from './product';
import { OrderInvoiceWebhookEventTypes } from './order';
import { CategoryBranchWebhookEventTypes } from './category-branch';
import { PriceBookWebhookEventTypes } from './pricebook';

export type WebhookEventDataMapping = CustomerWebhookEventTypes &
  ProductWebhookEventTypes &
  OrderInvoiceWebhookEventTypes &
  CategoryBranchWebhookEventTypes &
  PriceBookWebhookEventTypes;
