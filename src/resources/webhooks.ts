import { createHmac } from 'crypto';
import { KiotVietClient } from '../client';
import {
  Webhook,
  WebhookCreateParams,
  WebhookUpdateParams,
  WebhookListParams,
  WebhookListResponse,
  WebhookPayload
} from '../types/webhook';

export class WebhookHandler {
  constructor(private client: KiotVietClient) {}

  /**
   * List webhooks with optional filtering
   * @param params Filter parameters
   */
  async list(params: WebhookListParams = {}): Promise<WebhookListResponse> {
    const response = await this.client.apiClient.get<WebhookListResponse>(
      '/webhooks',
      { params }
    );
    return response.data;
  }

  /**
   * Get a webhook by its ID
   * @param webhookId The ID of the webhook to retrieve
   */
  async getById(webhookId: number): Promise<Webhook> {
    const response = await this.client.apiClient.get<Webhook>(`/webhooks/${webhookId}`);
    return response.data;
  }

  /**
   * Create a new webhook
   * @param webhookData The webhook configuration data
   */
  async create(webhookData: WebhookCreateParams): Promise<Webhook> {
    const response = await this.client.apiClient.post<Webhook>(
      '/webhooks',
      webhookData
    );
    return response.data;
  }

  /**
   * Update an existing webhook
   * @param webhookId The ID of the webhook to update
   * @param webhookData The webhook data to update
   */
  async update(webhookId: number, webhookData: Partial<WebhookUpdateParams>): Promise<Webhook> {
    const response = await this.client.apiClient.put<Webhook>(
      `/webhooks/${webhookId}`,
      {
        id: webhookId,
        ...webhookData
      }
    );
    return response.data;
  }

  /**
   * Delete a webhook
   * @param webhookId The ID of the webhook to delete
   */
  async delete(webhookId: number): Promise<void> {
    await this.client.apiClient.delete(`/webhooks/${webhookId}`);
  }

  /**
   * Enable a webhook
   * @param webhookId The ID of the webhook to enable
   */
  async enable(webhookId: number): Promise<Webhook> {
    return this.update(webhookId, { isActive: true });
  }

  /**
   * Disable a webhook
   * @param webhookId The ID of the webhook to disable
   */
  async disable(webhookId: number): Promise<Webhook> {
    return this.update(webhookId, { isActive: false });
  }

  /**
   * Verify webhook signature
   * @param payload The raw webhook payload
   * @param signature The signature from X-KiotViet-Signature header
   * @param secret The webhook secret
   */
  verifySignature(payload: string, signature: string, secret: string): boolean {
    const expectedSignature = createHmac('sha256', secret)
      .update(payload)
      .digest('hex');
    
    return signature === expectedSignature;
  }

  /**
   * Parse and verify webhook payload
   * @param payload The raw webhook payload string
   * @param signature The signature from X-KiotViet-Signature header
   * @param secret The webhook secret
   */
  parseWebhookPayload<T = any>(
    payload: string,
    signature: string,
    secret: string
  ): WebhookPayload<T> {
    if (!this.verifySignature(payload, signature, secret)) {
      throw new Error('Invalid webhook signature');
    }

    return JSON.parse(payload) as WebhookPayload<T>;
  }
}