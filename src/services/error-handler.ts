import { AxiosError } from 'axios'
import {
  KiotVietApiError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
} from '../errors'
import { KiotVietErrorResponse } from '../types'

export class ErrorHandler {
  public static handleRequestError(error: AxiosError<KiotVietErrorResponse | any>): never {
    if (error.response) {
      const status = error.response.status
      const data = error.response.data
      const apiErrorStatus = data?.responseStatus

      const message =
        apiErrorStatus?.message || data?.message || error.message || `Request failed with status code ${status}`

      switch (status) {
        case 400:
          throw new ValidationError(message, apiErrorStatus, data)
        case 401:
          throw new AuthenticationError(message, data)
        case 403:
          throw new ForbiddenError(message, data)
        case 404:
          throw new NotFoundError(message, data)
        case 429:
          throw new RateLimitError(message, data)
        default:
          throw new KiotVietApiError(message, status, apiErrorStatus, data)
      }
    }

    if (error.request) {
      throw new KiotVietApiError('No response received from KiotViet API', undefined, undefined, {
        request: error.request,
      })
    }

    throw new KiotVietApiError(`Request setup error: ${error.message}`, undefined, undefined, error)
  }
}
