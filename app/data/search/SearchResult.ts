export enum ResourceType {
  CUSTOMER = "Customer",
  JOB = "Job",
  MATERIAL = "Material",
}

export interface SearchResult {
  id: number;
  title: string;
  type: ResourceType
}