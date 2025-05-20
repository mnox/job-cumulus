import type { Customer } from '~/data/customers/Customer';
import MockController from '~/services/mock/controllers/MockController';
import { mockCustomers } from '~/services/mock/data/customers';

class CustomerController extends MockController<Customer> {
  mockResource = mockCustomers;
  resourceKey = 'customers';
}

export default new CustomerController();