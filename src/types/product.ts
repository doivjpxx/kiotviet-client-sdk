export interface Product {
  id: number;
  code: string;
  name: string;
  fullName: string;
  description?: string;
  basePrice: number;
  retailPrice?: number;
  categoryName?: string;
  categoryId?: number;
  allowsSale: boolean;
  unit?: string;
  conversionValue?: number;
  inventories?: Array<{
    branchId: number;
    branchName: string;
    onHand: number;
    reserved: number;
    available: number;
    minQuantity?: number;
    maxQuantity?: number;
  }>;
  attributes?: Array<{
    attributeName: string;
    attributeValue: string;
  }>;
  modifiedDate: string;
  createdDate: string;
  hasVariants: boolean;
  isActive: boolean;
  isRewardPoint: boolean;
  weight?: number;
  masterProductId?: number;
  masterCode?: string;
  masterName?: string;
  brandId?: number;
  brandName?: string;
  images?: string[];
  barcode?: string;
  status?: number;
}

export interface ProductCreateParams {
  code?: string;
  name: string;
  categoryId?: number;
  basePrice: number;
  unit?: string;
  allowsSale?: boolean;
  description?: string;
  hasVariants?: boolean;
  isActive?: boolean;
  attributes?: Array<{
    attributeName: string;
    attributeValue: string;
  }>;
  barcode?: string;
  brandId?: number;
  weight?: number;
  isRewardPoint?: boolean;
}

export interface ProductUpdateParams extends Partial<ProductCreateParams> {
  id: number;
}
