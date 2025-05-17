import type { Customer } from '~/data/customers/Customer';
import { mockCustomers } from '~/services/mock/data/customers';

class CustomerController {
  private customers: Customer[] = [...mockCustomers]
  
  getAllCustomers(): Promise<Customer[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.customers])
      }, 300)
    })
  }
  
  getCustomerById(id: number): Promise<Customer | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = this.customers.find((customer) => customer.id === id)
        resolve(customer ? { ...customer } : null)
      }, 300)
    })
  }
  
  createCustomer(customerData: Omit<Customer, "id" | "createdAt" | "updatedAt">): Promise<Customer> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString()
        const newCustomer: Customer = {
          id: this.getNextId(),
          ...customerData,
          createdAt: now,
          updatedAt: now,
        }
        this.customers.push(newCustomer)
        resolve({ ...newCustomer })
      }, 300)
    })
  }
  
  updateCustomer(id: number, customerData: Partial<Customer>): Promise<Customer | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.customers.findIndex((customer) => customer.id === id)
        if (index === -1) {
          resolve(null)
          return
        }
        
        const updatedCustomer = {
          ...this.customers[index],
          ...customerData,
          id: this.customers[index].id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString(),
        }
        
        this.customers[index] = updatedCustomer
        resolve({ ...updatedCustomer })
      }, 300)
    })
  }
  
  deleteCustomer(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.customers.findIndex((customer) => customer.id === id)
        if (index === -1) {
          resolve(false)
          return
        }
        
        this.customers.splice(index, 1)
        resolve(true)
      }, 300)
    })
  }
  
  private getNextId(): number {
    return Math.max(...this.customers.map((customer) => customer.id)) + 1
  }
}

export default new CustomerController()
