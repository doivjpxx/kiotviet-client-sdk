import { WebhookEvent } from '../webhook';

/**
 * Interface mô tả quan hệ bảng giá - chi nhánh trong webhook pricebook.update
 */
export interface PriceBookBranchWebhookData {
  Id: number;
  PriceBookId: number;
  BranchId: number;
  BranchName: string;
}

/**
 * Interface mô tả quan hệ bảng giá - nhóm khách hàng trong webhook pricebook.update
 */
export interface PriceBookCustomerGroupWebhookData {
  CustomerGroupName: string;
  Id: number;
  PriceBookId: number;
  CustomerGroupId: number;
}

/**
 * Interface mô tả quan hệ bảng giá - người dùng trong webhook pricebook.update
 */
export interface PriceBookUserWebhookData {
  UserName: string;
  Id: number;
  PriceBookId: number;
  UserId: number;
}

/**
 * Interface mô tả dữ liệu bảng giá trong webhook pricebook.update
 */
export interface PriceBookWebhookData {
  Id: number;
  Name: string;
  IsActive: boolean;
  IsGlobal: boolean;
  StartDate: string;
  EndDate: string;
  ForAllCusGroup: boolean;
  ForAllUser: boolean;
  PriceBookBranches?: PriceBookBranchWebhookData[];
  PriceBookCustomerGroups?: PriceBookCustomerGroupWebhookData[];
  PriceBookUsers?: PriceBookUserWebhookData[];
}

/**
 * Interface mô tả cấu trúc payload cho webhook pricebook.update
 */
export interface PriceBookUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: PriceBookWebhookData[];
  }>;
}

/**
 * Interface mô tả cấu trúc payload cho webhook pricebook.delete
 */
export interface PriceBookDeleteWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: number[]; // Id bảng giá
  }>;
}

/**
 * Interface mô tả dữ liệu chi tiết bảng giá trong webhook pricebookdetail.update
 */
export interface PriceBookDetailWebhookData {
  PriceBookId: number;
  ProductId: number;
  Price: number;
}

/**
 * Interface mô tả cấu trúc payload cho webhook pricebookdetail.update
 */
export interface PriceBookDetailUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: PriceBookDetailWebhookData[];
  }>;
}

/**
 * Interface mô tả dữ liệu xóa chi tiết bảng giá trong webhook pricebookdetail.delete
 */
export interface PriceBookDetailDeleteData {
  PricebookId: number;
  ProductIds: number[];
}

/**
 * Interface mô tả cấu trúc payload cho webhook pricebookdetail.delete
 */
export interface PriceBookDetailDeleteWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: PriceBookDetailDeleteData[];
  }>;
}

/**
 * Type helper để làm việc với webhook bảng giá
 */
export type PriceBookWebhookEventTypes = {
  [WebhookEvent.PriceBookUpdated]: PriceBookUpdateWebhookPayload;
  [WebhookEvent.PriceBookDeleted]: PriceBookDeleteWebhookPayload;
  [WebhookEvent.PriceBookDetailUpdated]: PriceBookDetailUpdateWebhookPayload;
  [WebhookEvent.PriceBookDetailDeleted]: PriceBookDetailDeleteWebhookPayload;
};
