export enum TaskStatuses {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed',
}

export type TaskStatus = keyof typeof TaskStatuses;

export enum TaskPriorities {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
}

export type TaskPriority = keyof typeof TaskPriorities;

export interface Task {
  id: number;
  jobId: number;
  title: string;
  description: string;
  assignedTo: number; // User ID
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  completedDate?: string;
}