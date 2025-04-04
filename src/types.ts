// Common response structure for lists
export interface KiotVietListResponse<T> {
  total: number;
  pageSize: number;
  currentItem?: number; // Not always present in list responses? Check PDF
  data: T[];
  timestamp?: string; // Seen in some PDF examples (e.g., categories page 6/7)
  removedIds?: number[]; // Seen in some PDF examples (e.g., categories page 6/7)
}

// Placeholder for a Customer object - Fill based on PDF page 50/51
export interface Customer {
  id: number;
  code: string;
  name: string;
  gender?: boolean;
  birthDate?: string | null; // Date format needs verification
  contactNumber?: string | null;
  address?: string | null;
  locationName?: string | null;
  wardName?: string | null;
  email?: string | null;
  organization?: string | null;
  comments?: string | null;
  taxCode?: string | null;
  debt?: number; // Assuming number, check type
  totalInvoiced?: number;
  totalPoint?: number;
  totalRevenue?: number;
  retailerId: number;
  modifiedDate?: string;
  createdDate: string;
  rewardPoint?: number;
  psidFacebook?: number | string | null; // Type needs verification
  groups?: string; // From get by ID response page 51
  // Add other fields from PDF...
  customerId?: number;
  customerName?: string;
  customerType?: string;
  customerGroupId?: number;
}

// Placeholder for Customer creation payload - Fill based on PDF page 51/52
export interface CustomerCreateParams {
  code?: string; // Optional?
  name: string;
  gender?: boolean;
  birthDate?: string;
  contactNumber?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  email?: string;
  comments?: string;
  // organization?: string; // Not seen in create payload example?
  // taxCode?: string; // Not seen in create payload example?
  groupIds?: number[];
  branchId?: number; // Only one branchId in example?
  customerCode?: string;
  customerName?: string;
  customerType?: string;
  customerGroupId?: number;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  fullName: string;
  description?: string;
  basePrice: number;
  retailPrice?: number;
  categoryName?: string;
  categoryId?: number;
  allowsSale: boolean;
  unit?: string;
  conversionValue?: number;
  inventories?: Array<{
    branchId: number;
    branchName: string;
    onHand: number;
    reserved: number;
    available: number;
    minQuantity?: number;
    maxQuantity?: number;
  }>;
  attributes?: Array<{
    attributeName: string;
    attributeValue: string;
  }>;
  modifiedDate: string;
  createdDate: string;
  hasVariants: boolean;
  isActive: boolean;
  isRewardPoint: boolean;
  weight?: number;
  masterProductId?: number;
  masterCode?: string;
  masterName?: string;
  brandId?: number;
  brandName?: string;
  images?: string[];
  barcode?: string;
  status?: number;
}

export interface ProductCreateParams {
  code?: string;
  name: string;
  categoryId?: number;
  basePrice: number;
  unit?: string;
  allowsSale?: boolean;
  description?: string;
  hasVariants?: boolean;
  isActive?: boolean;
  attributes?: Array<{
    attributeName: string;
    attributeValue: string;
  }>;
  barcode?: string;
  brandId?: number;
  weight?: number;
  isRewardPoint?: boolean;
}

export interface ProductUpdateParams extends Partial<ProductCreateParams> {
  id: number;
}

// KiotViet Error structure
export interface KiotVietErrorStatus {
  errorCode: string;
  message: string;
}

export interface KiotVietErrorResponse {
  responseStatus: KiotVietErrorStatus;
  // Potentially other fields
}

// Config for the client
export interface KiotVietClientConfig {
  clientId: string;
  clientSecret: string;
  retailerName: string;
  baseUrl?: string;
  tokenUrl?: string;
  apiVersion?: string;
  timeout?: number;
  // Optional timeout, retry config?
}

// Structure of the token response from /connect/token (PDF page 5)
export interface KiotVietTokenResponse {
  access_token: string;
  expires_in: number; // seconds
  token_type: "Bearer";
}
