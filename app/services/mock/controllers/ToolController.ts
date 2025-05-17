import type { Tool } from '~/data/inventory/Tool';
import { mockTools } from '~/services/mock/data/tools';

class ToolController {
  private tools: Tool[] = [...mockTools]
  
  getAllTools(): Promise<Tool[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.tools])
      }, 300)
    })
  }
  
  getToolById(id: number): Promise<Tool | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tool = this.tools.find((tool) => tool.id === id)
        resolve(tool ? { ...tool } : null)
      }, 300)
    })
  }
  
  createTool(toolData: Omit<Tool, "id">): Promise<Tool> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTool: Tool = {
          id: this.getNextId(),
          ...toolData,
        }
        this.tools.push(newTool)
        resolve({ ...newTool })
      }, 300)
    })
  }
  
  updateTool(id: number, toolData: Partial<Tool>): Promise<Tool | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.tools.findIndex((tool) => tool.id === id)
        if (index === -1) {
          resolve(null)
          return
        }
        
        const updatedTool = {
          ...this.tools[index],
          ...toolData,
          id: this.tools[index].id, // Ensure ID doesn't change
        }
        
        this.tools[index] = updatedTool
        resolve({ ...updatedTool })
      }, 300)
    })
  }
  
  deleteTool(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.tools.findIndex((tool) => tool.id === id)
        if (index === -1) {
          resolve(false)
          return
        }
        
        this.tools.splice(index, 1)
        resolve(true)
      }, 300)
    })
  }
  
  private getNextId(): number {
    return Math.max(...this.tools.map((tool) => tool.id)) + 1
  }
}

export default new ToolController()
