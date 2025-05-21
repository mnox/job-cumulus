import type { Address } from '~/data/misc/Address';

export const SearchableCustomerAttributes = [
  'name',
  'email',
  'phone',
];

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: Address;
  company?: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  jobs: number[]; // References to job IDs
}