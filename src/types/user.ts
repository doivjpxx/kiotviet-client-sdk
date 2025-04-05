import { KiotVietListResponse } from './common';

export interface User {
  id: number;
  userName: string;
  givenName: string;
  address?: string;
  mobilePhone?: string;
  email?: string;
  description?: string;
  retailerId: number;
  birthDate?: string;
  createdDate: string;
  modifiedDate?: string;
}

export interface UserListParams {
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  includeRemoveIds?: boolean;
}

export type UserListResponse = KiotVietListResponse<User>;
