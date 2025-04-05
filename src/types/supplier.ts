import { KiotVietListResponse } from './common';

export interface Supplier {
  id: number;
  code: string;
  name: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  organization?: string;
  taxCode?: string;
  comments?: string;
  description?: string;
  isActive: boolean;
  modifiedDate?: string;
  createdDate: string;
  retailerId: number;
  branchId?: number;
  createdBy?: string;
  debt?: number;
  totalInvoiced?: number;
  totalInvoicedWithoutReturn?: number;
  supplierGroupId?: number;
  supplierGroupIds?: number[];
  supplierGroup?: {
    id: number;
    name: string;
    description?: string;
    retailerId: number;
    isActive: boolean;
  };
}

export interface SupplierListParams {
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  code?: string;
  name?: string;
  contactNumber?: string;
  lastModifiedFrom?: string;
  includeRemoveIds?: boolean;
  includeTotal?: boolean;
  includeSupplierGroup?: boolean;
  isActive?: boolean;
  supplierGroupId?: number;
}

export interface SupplierCreateParams {
  code?: string;
  name: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  organization?: string;
  taxCode?: string;
  comments?: string;
  description?: string;
  isActive?: boolean;
  branchId?: number;
  supplierGroupIds?: number[];
}

export interface SupplierUpdateParams extends Partial<SupplierCreateParams> {
  id: number;
}

export interface SupplierGroupCreateParams {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface SupplierGroupUpdateParams extends Partial<SupplierGroupCreateParams> {
  id: number;
}

export type SupplierListResponse = KiotVietListResponse<Supplier>;
