import { KiotVietListResponse } from './common';

export interface Category {
  categoryId: number;
  categoryName: string;
  parentId: number | null;
  hasChild?: boolean;
  description?: string;
  retailerId: number;
  rank?: number;
  isDeleted?: boolean;
  modifiedDate: string;
  createdDate: string;
}

export interface CategoryCreateParams {
  categoryName: string;
  parentId?: number;
  description?: string;
  rank?: number;
}

export interface CategoryUpdateParams extends Partial<CategoryCreateParams> {
  id: number;
}

export interface CategoryListParams {
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  hierarchicalData?: boolean;
  includeRemoveIds?: boolean;
}

export type CategoryListResponse = KiotVietListResponse<Category>;
