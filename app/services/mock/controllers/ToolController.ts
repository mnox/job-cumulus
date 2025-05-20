import type { Tool } from '~/data/tools/Tool';
import MockController from '~/services/mock/controllers/MockController';
import { mockTools } from '~/services/mock/data/tools';

class ToolController extends MockController<Tool> {
  mockResource = mockTools;
  resourceKey = 'tools';
}

export default new ToolController();