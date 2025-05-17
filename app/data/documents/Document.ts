export enum DocumentTypes {
  Contract = 'Contract',
  Invoice = 'Invoice',
  Estimate = 'Estimate',
  Permit = 'Permit',
  Other = 'Other',
}

export type DocumentType = keyof typeof DocumentTypes;

export interface Document {
  id: number;
  name: string;
  type: DocumentType;
  url: string;
  uploadedBy: number; // User ID
  uploadedAt: string;
  size: number; // in bytes
}