import { KiotVietListResponse } from './common';

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  hasChild: boolean;
  description?: string;
  retailerId: number;
  modifiedDate: string;
  createdDate: string;
}

export interface CategoryCreateParams {
  name: string;
  parentId?: number;
  description?: string;
}

export interface CategoryUpdateParams extends Partial<CategoryCreateParams> {
  id: number;
}

export interface CategoryListParams {
  pageSize?: number;
  currentItem?: number;
  hierarchicalData?: boolean;
}

export type CategoryListResponse = KiotVietListResponse<Category>;
