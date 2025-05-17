export enum JobMaterialStatuses {
  Ordered = 'Ordered',
  OnSite = 'OnSite',
  InStock = 'InStock',
  Damaged = 'Damaged',
  Depleted = 'Depleted',
  Delayed = 'Delayed',
}

export type JobMaterialStatus = keyof typeof JobMaterialStatuses;

export interface JobMaterial {
  id: number;
  materialId: number;
  quantity: number;
  totalCost: number;
  unitCost: number;
  status: JobMaterialStatus;
}