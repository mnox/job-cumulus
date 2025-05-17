import type { Material } from '~/data/materials/Material';
import MockController from '~/services/mock/controllers/MockController';
import { mockMaterials } from '~/services/mock/data/materials';

export default class MaterialController extends MockController<Material> {
  mockResource = mockMaterials;
  resourceKey = 'materials';
  
  protected formatResources = (resources: Material[]) => {
    return resources.map(r => ({
      ...r,
      needsReorder: this.materialNeedsReorder(r),
    }));
  }
  
  private materialNeedsReorder(material: Material): boolean {
    return material.quantityInStock <= material.reorderPoint;
  }
}