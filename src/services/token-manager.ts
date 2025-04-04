import axios from 'axios'
import { KiotVietClientConfig, KiotVietTokenResponse } from '../types'
import { AuthenticationError } from '../errors'
import { API_CONSTANTS, CONTENT_TYPES } from '../config/constants'

export class TokenManager {
  private _accessToken: string | null = null
  private _tokenExpiresAt: number | null = null
  private _isFetchingToken: boolean = false
  private _tokenPromise: Promise<string> | null = null

  constructor(private config: KiotVietClientConfig) {}

  public async getValidToken(): Promise<string> {
    const now = Date.now()
    if (this._accessToken && this._tokenExpiresAt && this._tokenExpiresAt > now) {
      return this._accessToken
    }
    return this.fetchNewToken()
  }

  public async refreshToken(): Promise<string> {
    this._accessToken = null
    this._tokenExpiresAt = null
    return this.fetchNewToken()
  }

  private async fetchNewToken(): Promise<string> {
    if (this._isFetchingToken && this._tokenPromise) {
      return this._tokenPromise
    }

    this._isFetchingToken = true
    this._tokenPromise = (async () => {
      try {
        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')
        params.append('client_id', this.config.clientId)
        params.append('client_secret', this.config.clientSecret)
        params.append('scopes', API_CONSTANTS.DEFAULT_SCOPE)

        const response = await axios.post<KiotVietTokenResponse>(
          this.config.tokenUrl || API_CONSTANTS.DEFAULT_TOKEN_URL,
          params,
          {
            headers: { 'Content-Type': CONTENT_TYPES.FORM_URLENCODED },
          },
        )

        const { access_token, expires_in } = response.data
        this._accessToken = access_token
        this._tokenExpiresAt = Date.now() + (expires_in - API_CONSTANTS.TOKEN_BUFFER_SECONDS) * 1000

        return access_token
      } catch (error: any) {
        this._accessToken = null
        this._tokenExpiresAt = null
        const responseData = error.response?.data
        const message = responseData?.error_description || responseData?.error || 'Failed to fetch access token'
        throw new AuthenticationError(message, responseData)
      } finally {
        this._isFetchingToken = false
        this._tokenPromise = null
      }
    })()

    return this._tokenPromise
  }
}
