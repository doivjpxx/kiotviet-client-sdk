import { WebhookEvent } from '../webhook';

/**
 * Interface mô tả dữ liệu danh mục trong webhook category.update
 */
export interface CategoryWebhookData {
  Id: number;
  Name: string;
  ParentId?: number;
  IsDeleted: boolean;
  CreatedDate: string;
  ModifiedDate?: string;
  RetailerId: number;
  Rank: number;
  HasChild: boolean;
}

/**
 * Interface mô tả cấu trúc payload cho webhook category.update
 */
export interface CategoryUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: CategoryWebhookData[];
  }>;
}

/**
 * Interface mô tả cấu trúc payload cho webhook category.delete
 */
export interface CategoryDeleteWebhookPayload {
  RemoveId: number[];
}

/**
 * Interface mô tả dữ liệu chi nhánh trong webhook branch.update
 */
export interface BranchWebhookData {
  Id: number;
  Name: string;
  ContactNumber: string;
  SubContactNumber: string;
  Address: string;
  Location: string;
  WardName: string;
  IsActive: boolean;
  IsLock: boolean;
  CreatedDate: string;
  ModifiedDate?: string;
  RetailerId: number;
}

/**
 * Interface mô tả cấu trúc payload cho webhook branch.update
 */
export interface BranchUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: BranchWebhookData[];
  }>;
}

/**
 * Interface mô tả cấu trúc payload cho webhook branch.delete
 */
export interface BranchDeleteWebhookPayload {
  RemoveId: number[];
}

/**
 * Type helper để làm việc với webhook danh mục và chi nhánh
 */
export type CategoryBranchWebhookEventTypes = {
  [WebhookEvent.CategoryCreated]: CategoryUpdateWebhookPayload;
  [WebhookEvent.CategoryUpdated]: CategoryUpdateWebhookPayload;
  [WebhookEvent.CategoryDeleted]: CategoryDeleteWebhookPayload;
  [WebhookEvent.BranchUpdated]: BranchUpdateWebhookPayload;
  [WebhookEvent.BranchDeleted]: BranchDeleteWebhookPayload;
};
