// Export the main client
export { KiotVietClient } from './client';

// Export resource handlers
export { CustomerHandler } from './resources/customers';
export { ProductHandler } from './resources/products';

// Export types
export {
  KiotVietListResponse,
  KiotVietClientConfig,
  KiotVietTokenResponse,
  KiotVietErrorResponse,
  KiotVietErrorStatus,
  Customer,
  CustomerCreateParams,
  Product,
  ProductCreateParams,
  ProductUpdateParams
} from './types';

// Export error classes
export {
  KiotVietApiError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError
} from './errors';