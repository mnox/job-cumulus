import type { User } from '~/data/users/User';

export const mockUsers: User[] = [
  {
    id: 1,
    firstName: "Matt",
    lastName: "Noxon",
    email: "matt.noxon@jobcumulus.com",
    phone: "(555) 123-4567",
    role: "admin",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    createdAt: "2023-01-15T08:30:00Z",
    lastLogin: "2023-05-10T14:22:00Z",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    role: "manager",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    createdAt: "2023-02-20T10:15:00Z",
    lastLogin: "2023-05-09T16:45:00Z",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Johnson",
    email: "mike.johnson@example.com",
    phone: "(555) 456-7890",
    role: "contractor",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    createdAt: "2023-03-10T09:45:00Z",
    lastLogin: "2023-05-08T11:30:00Z",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 789-0123",
    role: "employee",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    createdAt: "2023-04-05T14:20:00Z",
    lastLogin: "2023-05-10T09:15:00Z",
  },
]

export const currentUser: User = mockUsers[0];
