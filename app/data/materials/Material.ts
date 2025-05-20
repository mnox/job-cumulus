export enum MaterialCategories {
  Lumber = 'Lumber',
  Hardware = 'Hardware',
  Paint = 'Paint',
  Drywall = 'Drywall',
  Tile = 'Tile',
  Countertops = 'Countertops',
  Roofing = 'Roofing',
  Gutters = 'Gutters',
  Composite = 'Composite',
  Plumbing = 'Plumbing',
}

export type MaterialCategory = keyof typeof MaterialCategories;

export const SearchableMaterialAttributes = [
  'name',
  'sku',
];

export interface Material {
  id: number;
  name: string;
  description: string;
  category: MaterialCategory;
  sku: string;
  unitOfMeasure: string;
  unitCost: number;
  quantityInStock: number;
  reorderPoint: number;
  supplier: string;
  photos?: string[];
  needsReorder?: boolean;
}