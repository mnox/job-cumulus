import type { Job } from '~/data/jobs/Job';
import type { JobMaterial } from '~/data/jobs/JobMaterial';
import type { Task } from '~/data/tasks/Task';
import type { Tool } from '~/data/tools/Tool';
import { mockJobs } from '~/services/mock/data/jobs';

class JobController {
  private jobs: Job[] = [...mockJobs]
  
  getAllJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.jobs])
      }, 300)
    })
  }
  
  getJobById(id: number): Promise<Job | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const job = this.jobs.find((job) => job.id === id)
        resolve(job ? { ...job } : null)
      }, 300)
    })
  }
  
  createJob(jobData: Omit<Job, "id" | "createdAt" | "updatedAt">): Promise<Job> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const now = new Date().toISOString()
        const newJob: Job = {
          id: this.getNextId(),
          ...jobData,
          createdAt: now,
          updatedAt: now,
        }
        this.jobs.push(newJob)
        resolve({ ...newJob })
      }, 300)
    })
  }
  
  updateJob(id: number, jobData: Partial<Job>): Promise<Job | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.jobs.findIndex((job) => job.id === id)
        if (index === -1) {
          resolve(null)
          return
        }
        
        const updatedJob = {
          ...this.jobs[index],
          ...jobData,
          id: this.jobs[index].id, // Ensure ID doesn't change
          updatedAt: new Date().toISOString(),
        }
        
        this.jobs[index] = updatedJob
        resolve({ ...updatedJob })
      }, 300)
    })
  }
  
  deleteJob(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.jobs.findIndex((job) => job.id === id)
        if (index === -1) {
          resolve(false)
          return
        }
        
        this.jobs.splice(index, 1)
        resolve(true)
      }, 300)
    })
  }
  
  // Job Materials
  addJobMaterial(jobId: number, materialData: Omit<JobMaterial, "id">): Promise<JobMaterial | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(null)
          return
        }
        
        const newMaterial: JobMaterial = {
          id: this.getNextMaterialId(jobId),
          ...materialData,
        }
        
        this.jobs[jobIndex].materials.push(newMaterial)
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve({ ...newMaterial })
      }, 300)
    })
  }
  
  updateJobMaterial(
    jobId: number,
    materialId: number,
    materialData: Partial<JobMaterial>,
  ): Promise<JobMaterial | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(null)
          return
        }
        
        const materialIndex = this.jobs[jobIndex].materials.findIndex((m) => m.id === materialId)
        if (materialIndex === -1) {
          resolve(null)
          return
        }
        
        const updatedMaterial = {
          ...this.jobs[jobIndex].materials[materialIndex],
          ...materialData,
          id: materialId, // Ensure ID doesn't change
        }
        
        this.jobs[jobIndex].materials[materialIndex] = updatedMaterial
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve({ ...updatedMaterial })
      }, 300)
    })
  }
  
  removeJobMaterial(jobId: number, materialId: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(false)
          return
        }
        
        const materialIndex = this.jobs[jobIndex].materials.findIndex((m) => m.id === materialId)
        if (materialIndex === -1) {
          resolve(false)
          return
        }
        
        this.jobs[jobIndex].materials.splice(materialIndex, 1)
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve(true)
      }, 300)
    })
  }
  
  // Job Tools
  addJobTool(jobId: number, toolData: Omit<Tool, "id">): Promise<Tool | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(null)
          return
        }
        
        const newTool: Tool = {
          id: this.getNextToolId(jobId),
          ...toolData,
        }
        
        this.jobs[jobIndex].tools.push(newTool)
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve({ ...newTool })
      }, 300)
    })
  }
  
  // Tasks
  addTask(jobId: number, taskData: Omit<Task, "id">): Promise<Task | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(null)
          return
        }
        
        const newTask: Task = {
          id: this.getNextTaskId(jobId),
          ...taskData,
        }
        
        this.jobs[jobIndex].tasks.push(newTask)
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve({ ...newTask })
      }, 300)
    })
  }
  
  // Documents
  addDocument(jobId: number, documentData: Omit<Document, "id">): Promise<Document | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const jobIndex = this.jobs.findIndex((job) => job.id === jobId)
        if (jobIndex === -1) {
          resolve(null)
          return
        }
        
        const newDocument: Document = {
          id: this.getNextDocumentId(jobId),
          ...documentData,
        }
        
        this.jobs[jobIndex].documents.push(newDocument)
        this.jobs[jobIndex].updatedAt = new Date().toISOString()
        
        resolve({ ...newDocument })
      }, 300)
    })
  }
  
  private getNextId(): number {
    return Math.max(...this.jobs.map((job) => job.id)) + 1
  }
  
  private getNextMaterialId(jobId: number): number {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job || job.materials.length === 0) {
      return 1
    }
    return Math.max(...job.materials.map((material) => material.id)) + 1
  }
  
  private getNextToolId(jobId: number): number {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job || job.tools.length === 0) {
      return 1
    }
    return Math.max(...job.tools.map((tool) => tool.id)) + 1
  }
  
  private getNextTaskId(jobId: number): number {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job || job.tasks.length === 0) {
      return 1
    }
    return Math.max(...job.tasks.map((task) => task.id)) + 1
  }
  
  private getNextDocumentId(jobId: number): number {
    const job = this.jobs.find((job) => job.id === jobId)
    if (!job || job.documents.length === 0) {
      return 1
    }
    return Math.max(...job.documents.map((doc) => doc.id)) + 1
  }
}

export default new JobController()
