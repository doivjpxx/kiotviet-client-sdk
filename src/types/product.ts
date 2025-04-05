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
  type?: number;
  orderTemplate?: string;
  isDeleted?: boolean;
  retailerId?: number;
  isProductFormula?: boolean;
  isLotSerialControl?: boolean;
  isBatchExpireControl?: boolean;
  inventories?: Array<{
    branchId: number;
    branchName: string;
    onHand: number;
    reserved: number;
    available: number;
    onOrder?: number;
    minQuantity?: number;
    maxQuantity?: number;
    cost?: number;
  }>;

  attributes?: Array<{
    productId: number;
    attributeName: string;
    attributeValue: string;
  }>;

  productSerials?: Array<{
    productId: number;
    serialNumber: string;
    status: number;
    branchId: number;
    quantity?: number;
    createdDate: string;
    modifiedDate?: string;
  }>;

  productBatchExpires?: Array<{
    productId: number;
    onHand: number;
    batchName: string;
    expireDate: string;
    fullNameVirgule: string;
    branchId: number;
  }>;

  productWarranties?: Array<{
    id: number;
    description: string;
    numberTime: number;
    timeType: number;
    warrantyType: number;
    productId: number;
    retailerId: number;
    createdBy?: number;
    createdDate?: string;
    modifiedDate?: string;
  }>;

  priceBooks?: Array<{
    priceBookId: number;
    priceBookName: string;
    productId: number;
    isActive: boolean;
    startDate?: string;
    endDate?: string;
    price: number;
  }>;

  productFormulas?: Array<{
    materialId: number;
    materialCode: string;
    materialName: string;
    materialFullName: string;
    quantity: number;
    basePrice: number;
    productId?: number;
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
  fullName?: string;
  categoryId?: number;
  type?: number;
  isProductFormula?: boolean;
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
  isProductSerial?: boolean;
  masterUnitId?: number;
  conversionValue?: number;
  inventories?: Array<{
    branchId: number;
    branchName?: string;
    onHand?: number;
    cost?: number;
  }>;
  images?: string[];
}

export interface ProductUpdateParams extends Partial<ProductCreateParams> {
  id: number;
}
