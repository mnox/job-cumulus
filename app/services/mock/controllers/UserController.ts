import type { User } from '~/data/users/User';
import MockController from '~/services/mock/controllers/MockController';
import { mockUsers } from '~/services/mock/data/users';

class UserController extends MockController<User> {
  mockResource = mockUsers;
  resourceKey = 'users';
}

export default new UserController()
