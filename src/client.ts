import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import {
  KiotVietClientConfig,
  KiotVietTokenResponse,
  KiotVietErrorResponse,
} from "./types";
import {
  KiotVietApiError,
  AuthenticationError,
  ValidationError,
  ForbiddenError,
  NotFoundError,
  RateLimitError,
} from "./errors";
import { CustomerHandler } from "./resources/customers";
import { ProductHandler } from "./resources/products";
// Import other handlers...

const DEFAULT_BASE_URL = "https://public.kiotapi.com/";
const DEFAULT_TOKEN_URL = "https://id.kiotviet.vn/connect/token";
const DEFAULT_API_VERSION = "v1";
const TOKEN_BUFFER_SECONDS = 60; // Get new token 60s before expiry

export class KiotVietClient {
  private config: Required<
    Omit<KiotVietClientConfig, "baseUrl" | "tokenUrl"> &
      Pick<KiotVietClientConfig, "baseUrl" | "tokenUrl">
  >; // Make specific fields required internally
  private _accessToken: string | null = null;
  private _tokenExpiresAt: number | null = null; // Store expiry timestamp (ms)
  private _isFetchingToken: boolean = false;
  private _tokenPromise: Promise<string> | null = null;

  public readonly apiClient: AxiosInstance;

  // Resource Handlers
  public readonly customers: CustomerHandler;
  public readonly products: ProductHandler;
  // ... add other handlers

  constructor(config: KiotVietClientConfig) {
    if (!config.clientId || !config.clientSecret || !config.retailerName) {
      throw new Error("clientId, clientSecret, and retailerName are required");
    }

    this.config = {
      ...config,
      baseUrl: config.baseUrl || DEFAULT_BASE_URL,
      tokenUrl: config.tokenUrl || DEFAULT_TOKEN_URL,
      apiVersion: config.apiVersion || DEFAULT_API_VERSION,
      timeout: config.timeout !== undefined ? config.timeout : 30000,
    };

    this.apiClient = axios.create({
      baseURL: `${this.config.baseUrl.replace(/\/$/, "")}`, // Base URL without /public since it's already in the base URL
      timeout: config.timeout || 30000, // Default timeout 30s
    });

    this.setupInterceptors();

    // Initialize handlers
    this.customers = new CustomerHandler(this);
    this.products = new ProductHandler(this);
    // ... initialize other handlers
  }

  private setupInterceptors(): void {
    this.apiClient.interceptors.request.use(
      async (
        request: InternalAxiosRequestConfig,
      ): Promise<InternalAxiosRequestConfig> => {
        const token = await this._ensureValidToken();
        request.headers["Authorization"] = `Bearer ${token}`;
        request.headers["Retailer"] = this.config.retailerName; // Use 'Retailer' as the header name according to KiotViet API docs

        // Set Content-Type for relevant methods if not already set
        if (
          ["POST", "PUT", "PATCH"].includes(
            request.method?.toUpperCase() || "",
          ) &&
          request.data &&
          !request.headers["Content-Type"]
        ) {
          request.headers["Content-Type"] = "application/json";
        }

        return request;
      },
      (error) => Promise.reject(error), // Forward request configuration errors
    );

    this.apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError<KiotVietErrorResponse | any>) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          const apiErrorStatus = data?.responseStatus;

          const message =
            apiErrorStatus?.message ||
            data?.message ||
            error.message ||
            `Request failed with status code ${status}`;

          // Handle specific error types based on status code
          switch (status) {
            case 400:
              throw new ValidationError(message, apiErrorStatus, data);
            case 401:
              // Token errors are handled in _getAccessToken
              throw new AuthenticationError(message, data);
            case 403:
              throw new ForbiddenError(message, data);
            case 404:
              throw new NotFoundError(message, data);
            case 429:
              // Implement retry logic here if needed
              throw new RateLimitError(message, data);
            default:
              throw new KiotVietApiError(message, status, apiErrorStatus, data);
          }
        } else if (error.request) {
          throw new KiotVietApiError(
            "No response received from KiotViet API",
            undefined,
            undefined,
            { request: error.request },
          );
        } else {
          throw new KiotVietApiError(
            `Request setup error: ${error.message}`,
            undefined,
            undefined,
            error,
          );
        }
      },
    );
  }

  private async _getAccessToken(): Promise<string> {
    // If already fetching, return the existing promise
    if (this._isFetchingToken && this._tokenPromise) {
      return this._tokenPromise;
    }

    this._isFetchingToken = true;
    this._tokenPromise = (async () => {
      try {
        console.log("Fetching new KiotViet access token..."); // Add proper logging later
        const params = new URLSearchParams();
        params.append("grant_type", "client_credentials");
        params.append("client_id", this.config.clientId);
        params.append("client_secret", this.config.clientSecret);
        params.append("scopes", "PublicApi.Access"); // Scope from PDF page 5

        const response = await axios.post<KiotVietTokenResponse>(
          this.config.tokenUrl,
          params, // URLSearchParams automatically sets correct Content-Type
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          },
        );

        const { access_token, expires_in } = response.data;
        this._accessToken = access_token;
        // Calculate expiry time in milliseconds, with a buffer
        this._tokenExpiresAt =
          Date.now() + (expires_in - TOKEN_BUFFER_SECONDS) * 1000;

        console.log("Successfully fetched new KiotViet token.");
        return access_token;
      } catch (error: any) {
        console.error(
          "Error fetching KiotViet token:",
          error.response?.data || error.message,
        );
        // Reset token state on failure
        this._accessToken = null;
        this._tokenExpiresAt = null;
        const responseData = error.response?.data;
        const message =
          responseData?.error_description ||
          responseData?.error ||
          "Failed to fetch access token";
        throw new AuthenticationError(message, responseData); // Throw specific auth error
      } finally {
        this._isFetchingToken = false;
        this._tokenPromise = null; // Clear the promise once done
      }
    })();
    return this._tokenPromise;
  }

  private async _ensureValidToken(): Promise<string> {
    const now = Date.now();
    if (
      this._accessToken &&
      this._tokenExpiresAt &&
      this._tokenExpiresAt > now
    ) {
      // Token exists and is not expired (considering buffer)
      return this._accessToken;
    }
    // Token is invalid or expired, fetch a new one
    return this._getAccessToken();
  }

  // Optional: Expose a method to manually trigger token refresh if needed
  public async refreshToken(): Promise<string> {
    console.log("Manual token refresh triggered.");
    this._accessToken = null; // Force fetching a new token
    this._tokenExpiresAt = null;
    return this._getAccessToken();
  }
}
