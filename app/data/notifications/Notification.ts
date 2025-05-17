export enum NotificationTypes {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
  Success = 'success',
}

export type NotificationType = keyof typeof NotificationTypes;

export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: NotificationType;
  read: number;
  createdAt: string;
}