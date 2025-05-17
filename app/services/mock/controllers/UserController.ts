import type { User } from '~/data/users/User';
import { currentUser, mockUsers } from '~/services/mock/data/users';

class UserController {
  private users: User[] = [...mockUsers]
  private currentUser: User = { ...currentUser }
  
  getAllUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.users])
      }, 300)
    })
  }
  
  getUserById(id: number): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find((user) => user.id === id)
        resolve(user ? { ...user } : null)
      }, 300)
    })
  }
  
  getCurrentUser(): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ ...this.currentUser })
      }, 300)
    })
  }
  
  createUser(userData: Omit<User, "id" | "createdAt" | "lastLogin">): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: this.getNextId(),
          ...userData,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
        }
        this.users.push(newUser)
        resolve({ ...newUser })
      }, 300)
    })
  }
  
  updateUser(id: number, userData: Partial<User>): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.users.findIndex((user) => user.id === id)
        if (index === -1) {
          resolve(null)
          return
        }
        
        const updatedUser = {
          ...this.users[index],
          ...userData,
          id: this.users[index].id, // Ensure ID doesn't change
        }
        
        this.users[index] = updatedUser
        
        // If updating current user, update that too
        if (this.currentUser.id === id) {
          this.currentUser = { ...updatedUser }
        }
        
        resolve({ ...updatedUser })
      }, 300)
    })
  }
  
  deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.users.findIndex((user) => user.id === id)
        if (index === -1) {
          resolve(false)
          return
        }
        
        this.users.splice(index, 1)
        resolve(true)
      }, 300)
    })
  }
  
  private getNextId(): number {
    return Math.max(...this.users.map((user) => user.id)) + 1
  }
}

export default new UserController()
