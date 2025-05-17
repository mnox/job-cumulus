import type { CostFormula } from '~/data/costs/CostFormula';
import { mockFormulas } from '~/services/mock/data/formulas';

class FormulaController {
  private formulas: CostFormula[] = [...mockFormulas]
  
  getAllFormulas(): Promise<CostFormula[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.formulas])
      }, 300)
    })
  }
  
  getFormulaById(id: number): Promise<CostFormula | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const formula = this.formulas.find((formula) => formula.id === id)
        resolve(formula ? { ...formula } : null)
      }, 300)
    })
  }
  
  createFormula(formulaData: Omit<CostFormula, "id" | "createdAt" | "updatedAt">): Promise<CostFormula> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString()
        const newFormula: CostFormula = {
          id: this.getNextId(),
          ...formulaData,
          createdAt: now,
          updatedAt: now,
        }
        this.formulas.push(newFormula)
        resolve({ ...newFormula })
      }, 300)
    })
  }
  
  updateFormula(id: number, formulaData: Partial<CostFormula>): Promise<CostFormula | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.formulas.findIndex((formula) => formula.id === id)
        if (index === -1) {
          resolve(null)
          return
        }
        
        const updatedFormula = {
          ...this.formulas[index],
          ...formulaData,
          id: this.formulas[index].id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString(),
        }
        
        this.formulas[index] = updatedFormula
        resolve({ ...updatedFormula })
      }, 300)
    })
  }
  
  deleteFormula(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.formulas.findIndex((formula) => formula.id === id)
        if (index === -1) {
          resolve(false)
          return
        }
        
        this.formulas.splice(index, 1)
        resolve(true)
      }, 300)
    })
  }
  
  private getNextId(): number {
    return Math.max(...this.formulas.map((formula) => formula.id)) + 1
  }
}

export default new FormulaController()
