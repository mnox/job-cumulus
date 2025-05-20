import type { Address } from '~/data/misc/Address';

export const SearchableCustomerAttributes = [
  'firstName',
  'lastName',
  'email',
  'phone',
];

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
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