export interface CostFormula {
  id: number;
  name: string;
  description: string;
  formula: string // Could be a JSON string representing the formula
  createdBy: number // User ID
  createdAt: string;
  updatedAt: string;
  variables: any[];
}