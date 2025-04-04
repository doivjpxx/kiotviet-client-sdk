import { KiotVietListResponse } from './common';

export interface User {
  id: number;
  code: string;
  displayName: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  branchId: number;
  branchName: string;
  roleId: number;
  roleName: string;
  isActive: boolean;
  retailerId: number;
  createdDate: string;
  modifiedDate: string;
}

export interface UserListParams {
  pageSize?: number;
  currentItem?: number;
  isActive?: boolean;
  branchId?: number;
  roleId?: number;
  code?: string;
  name?: string;
}

export type UserListResponse = KiotVietListResponse<User>;

// Since this is a read-only API, we don't need CreateParams or UpdateParams interfaces

export enum UserRole {
  Admin = 1,
  Manager = 2,
  Cashier = 3,
  Staff = 4,
  // Add other roles as per KiotViet documentation
}
