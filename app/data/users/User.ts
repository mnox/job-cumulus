export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'contractor' | 'employee';
  avatar: string;
  createdAt: string;
  lastLogin: string;
}