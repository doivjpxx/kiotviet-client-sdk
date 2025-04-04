export interface Customer {
  id: number;
  code: string;
  name: string;
  gender?: boolean;
  birthDate?: string | null; // Date format needs verification
  contactNumber?: string | null;
  address?: string | null;
  locationName?: string | null;
  wardName?: string | null;
  email?: string | null;
  organization?: string | null;
  comments?: string | null;
  taxCode?: string | null;
  debt?: number; // Assuming number, check type
  totalInvoiced?: number;
  totalPoint?: number;
  totalRevenue?: number;
  retailerId: number;
  modifiedDate?: string;
  createdDate: string;
  rewardPoint?: number;
  psidFacebook?: number | string | null; // Type needs verification
  groups?: string; // From get by ID response page 51
  // Add other fields from PDF...
  customerId?: number;
  customerName?: string;
  customerType?: string;
  customerGroupId?: number;
}

// Placeholder for Customer creation payload - Fill based on PDF page 51/52
export interface CustomerCreateParams {
  code?: string; // Optional?
  name: string;
  gender?: boolean;
  birthDate?: string;
  contactNumber?: string;
  address?: string;
  locationName?: string;
  wardName?: string;
  email?: string;
  comments?: string;
  // organization?: string; // Not seen in create payload example?
  // taxCode?: string; // Not seen in create payload example?
  groupIds?: number[];
  branchId?: number; // Only one branchId in example?
  customerCode?: string;
  customerName?: string;
  customerType?: string;
  customerGroupId?: number;
}
