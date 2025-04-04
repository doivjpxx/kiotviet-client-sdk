// Common response structure for lists
export interface KiotVietListResponse<T> {
  total: number;
  pageSize?: number;
  currentItem?: number;
  data: T[];
  timestamp?: string;
  removedIds?: number[];
}

// KiotViet Error structure
export interface KiotVietErrorStatus {
  errorCode: string;
  message: string;
}

export interface KiotVietErrorResponse {
  responseStatus: KiotVietErrorStatus;
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
}

// Structure of the token response from /connect/token
export interface KiotVietTokenResponse {
  access_token: string;
  expires_in: number; // seconds
  token_type: 'Bearer';
}
