// Export the main client
export { KiotVietClient } from './client';

// Export resource handlers
export { CustomerHandler } from './resources/customers';
export { ProductHandler } from './resources/products';
export { CategoryHandler } from './resources/categories';
export { OrderHandler } from './resources/orders';

// Export types
export {
  KiotVietListResponse,
  KiotVietClientConfig,
  KiotVietTokenResponse,
  KiotVietErrorResponse,
  KiotVietErrorStatus,
  Product,
  ProductCreateParams,
  ProductUpdateParams,
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
  CategoryListParams,
  Order,
  OrderCreateParams,
  OrderUpdateParams,
  OrderListParams,
  OrderStatus,
  OrderProduct,
} from './types';

// Export error classes
export {
  KiotVietApiError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
} from './errors';
