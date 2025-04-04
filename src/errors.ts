import { KiotVietErrorStatus } from './types';

export class KiotVietApiError extends Error {
  public readonly statusCode?: number;
  public readonly errorCode?: string;
  public readonly errorMessage: string;
  public readonly responseBody?: any;

  constructor(message: string, statusCode?: number, errorStatus?: KiotVietErrorStatus, responseBody?: any) {
    super(message);
    this.name = 'KiotVietApiError';
    this.statusCode = statusCode;
    this.errorCode = errorStatus?.errorCode;
    // Use KiotViet message if available, otherwise the generic message
    this.errorMessage = errorStatus?.message || message;
    this.responseBody = responseBody;

    // Maintains proper stack trace (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KiotVietApiError);
    }
  }
}

export class AuthenticationError extends KiotVietApiError {
  constructor(message: string, responseBody?: any) {
    super(`Authentication Failed: ${message}`, 401, undefined, responseBody);
    this.name = 'AuthenticationError';
  }
}

export class NotFoundError extends KiotVietApiError {
  constructor(message: string, responseBody?: any) {
    super(`Resource Not Found: ${message}`, 404, undefined, responseBody);
    this.name = 'NotFoundError';
  }
}

export class RateLimitError extends KiotVietApiError {
  constructor(message: string, responseBody?: any) {
    super(`Rate Limit Exceeded: ${message}`, 429, undefined, responseBody);
    this.name = 'RateLimitError';
  }
}

export class ForbiddenError extends KiotVietApiError {
  constructor(message: string, responseBody?: any) {
    super(`Access Forbidden: ${message}`, 403, undefined, responseBody);
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends KiotVietApiError {
  constructor(message: string, errorStatus?: KiotVietErrorStatus, responseBody?: any) {
    super(message, 400, errorStatus, responseBody);
    this.name = 'ValidationError';
  }
}