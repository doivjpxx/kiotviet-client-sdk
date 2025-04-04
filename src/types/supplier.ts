import { KiotVietListResponse } from './common';

export interface Supplier {
  id: number;
  code: string;
  name: string;
  contactNumber: string;
  email: string;
  address: string;
  locationName: string;
  wardName: string;
  organization: string;
  taxCode: string;
  comments: string;
  groups: string;
  isActive: boolean;
  modifiedDate: string;
  createdDate: string;
  retailerId: number;
  branchId: number;
  createdBy: string;
  debt: number;
  totalInvoiced: number;
  totalInvoicedWithoutReturn: number;
}

export interface SupplierListParams {
  pageSize?: number;
  currentItem?: number;
  orderDirection?: 'Asc' | 'Desc';
  code?: string;
  name?: string;
  contactNumber?: string;
  lastModifiedFrom?: string;
  includeRemoveIds?: boolean;
  includeTotal?: boolean;
  includeSupplierGroup?: boolean;
}

export type SupplierListResponse = KiotVietListResponse<Supplier>;
