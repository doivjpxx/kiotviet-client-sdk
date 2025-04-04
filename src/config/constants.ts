export const API_CONSTANTS = {
  DEFAULT_BASE_URL: 'https://public.kiotapi.com/',
  DEFAULT_TOKEN_URL: 'https://id.kiotviet.vn/connect/token',
  DEFAULT_API_VERSION: 'v1',
  TOKEN_BUFFER_SECONDS: 60,
  DEFAULT_TIMEOUT: 30000,
  DEFAULT_SCOPE: 'PublicApi.Access',
} as const

export const HTTP_METHODS = {
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const

export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
} as const
