import type { Document } from 'app/data/documents/Document';
import type { Customer } from '~/data/customers/Customer';
import type { JobMaterial } from '~/data/jobs/JobMaterial';
import type { Task } from '~/data/tasks/Task';
import type { Tool } from '~/data/tools/Tool';

export enum JobStatuses {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export const SearchableJobAttributes = [
  'title',
];

export type JobStatus = keyof typeof JobStatuses;

export interface Job {
  id: number;
  title: string;
  description: string;
  customerId: number;
  status: JobStatus;
  progress: number; // 0-100
  startDate: string;
  endDate?: string;
  bidAmount: number;
  materialCost: number;
  laborCost: number;
  projectedRevenue: number;
  actualRevenue?: number;
  createdAt: string;
  updatedAt: string;
  assignedUsers: number[] // References to user IDs
  materials: JobMaterial[];
  tools: Tool[];
  tasks: Task[];
  photos: string[];
  documents: Document[];
  customer?: Customer;
}