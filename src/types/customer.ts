export interface Customer {
  id: number;
  code: string;
  name: string;
  type?: number; // 0: Personal, 1: Company
  gender?: boolean; // true: male, false: female
  birthDate?: string;
  contactNumber?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  email?: string;
  organization?: string;
  comments?: string;
  taxCode?: string;
  debt: number;
  totalInvoiced?: number;
  totalPoint?: number;
  totalRevenue?: number;
  retailerId: number;
  modifiedDate?: string;
  createdDate: string;
  rewardPoint?: number;
  psidFacebook?: number;
  groups?: string;
  branchId?: number;
  createdBy?: string;
  isActive?: boolean;
  customerGroupDetails?: Array<{
    id: number;
    customerId: number;
    groupId: number;
  }>;
}

export interface CustomerCreateParams {
  code?: string;
  name: string;
  gender?: boolean;
  birthDate?: string;
  contactNumber?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  email?: string;
  comments?: string;
  organization?: string;
  taxCode?: string;
  groupIds?: number[];
  branchId?: number;
}

export interface CustomerUpdateParams extends Partial<CustomerCreateParams> {
  id: number;
}

export interface CustomerListParams {
  code?: string;
  name?: string;
  contactNumber?: string;
  lastModifiedFrom?: string;
  pageSize?: number;
  currentItem?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
  includeRemoveIds?: boolean;
  includeTotal?: boolean;
  includeCustomerGroup?: boolean;
  birthDate?: string;
  groupId?: number;
  includeCustomerSocial?: boolean;
}

export interface CustomerGroupDetails {
  id: number;
  customerId: number;
  groupId: number;
}
