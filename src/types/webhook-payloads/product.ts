import { WebhookEvent } from '../webhook';

/**
 * Interface mô tả thuộc tính của sản phẩm trong webhook
 */
export interface ProductAttribute {
  ProductId: number;
  AttributeName: string;
  AttributeValue: string;
}

/**
 * Interface mô tả đơn vị của sản phẩm trong webhook
 */
export interface ProductUnit {
  Id: number;
  Code: string;
  Name: string;
  FullName: string;
  Unit: string;
  ConversionValue: number;
  BasePrice: number;
}

/**
 * Interface mô tả tồn kho của sản phẩm trong webhook
 */
export interface ProductInventory {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  BranchId: number;
  BranchName: string;
  Cost: number;
  OnHand: number;
  Reserved: number;
}

/**
 * Interface mô tả bảng giá của sản phẩm trong webhook
 */
export interface ProductPriceBook {
  ProductId: number;
  PriceBookId: number;
  PriceBookName: string;
  Price: number;
  IsActive: boolean;
  StartDate?: string;
  EndDate?: string;
}

/**
 * Interface mô tả hình ảnh của sản phẩm trong webhook
 */
export interface ProductImage {
  Image: string;
}

/**
 * Interface mô tả dữ liệu sản phẩm trong webhook product.update
 */
export interface ProductWebhookData {
  Id: number;
  Code: string;
  Name: string;
  FullName: string;
  CategoryId: number;
  CategoryName: string;
  masterProductId?: number;
  AllowsSale: boolean;
  HasVariants: boolean;
  BasePrice: number;
  Weight?: number;
  Unit: string;
  MasterUnitId?: number;
  ConversionValue?: number;
  ModifiedDate?: string;
  Attributes?: ProductAttribute[];
  Units?: ProductUnit[];
  Inventories?: ProductInventory[];
  PriceBooks?: ProductPriceBook[];
  Images?: ProductImage[];
}

/**
 * Interface mô tả cấu trúc payload cho webhook product.update
 */
export interface ProductUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: ProductWebhookData[];
  }>;
}

/**
 * Interface mô tả cấu trúc payload cho webhook product.delete
 */
export interface ProductDeleteWebhookPayload {
  RemoveId: number[];
}

/**
 * Interface mô tả dữ liệu tồn kho trong webhook stock.update
 */
export interface StockUpdateWebhookData {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  BranchId: number;
  BranchName: string;
  Cost: number;
  OnHand: number;
  Reserved: number;
}

/**
 * Interface mô tả cấu trúc payload cho webhook stock.update
 */
export interface StockUpdateWebhookPayload {
  Id: string;
  Attempt: number;
  Notifications: Array<{
    Action: string;
    Data: StockUpdateWebhookData[];
  }>;
}

/**
 * Type helper để làm việc với webhook sản phẩm
 */
export type ProductWebhookEventTypes = {
  [WebhookEvent.ProductCreated]: ProductUpdateWebhookPayload;
  [WebhookEvent.ProductUpdated]: ProductUpdateWebhookPayload;
  [WebhookEvent.ProductDeleted]: ProductDeleteWebhookPayload;
  [WebhookEvent.StockUpdated]: StockUpdateWebhookPayload;
};
