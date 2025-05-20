import type { CostFormula } from '~/data/costs/CostFormula';
import MockController from '~/services/mock/controllers/MockController';
import { mockFormulas } from '~/services/mock/data/formulas';

class FormulaController extends MockController<CostFormula> {
  mockResource = mockFormulas;
  resourceKey = 'formulas';
}

export default new FormulaController()