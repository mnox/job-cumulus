export enum ToolTypes {
  Drill = 'Drill',
  TableSaw = 'TableSaw',
  CircularSaw = 'CircularSaw',
  Ladder = 'Ladder',
  AirCompressor = 'AirCompressor',
  NailGun = 'NailGun',
  MiterSaw = 'MiterSaw',
  PressureWasher = 'PressureWasher',
  ConcreteMixer = 'ConcreteMixer',
  Generator = 'Generator',
}

export type ToolType = keyof typeof ToolTypes;

export interface Tool {
  id: number;
  type: ToolType;
  msrp: number;
  name: string;
  description: string;
  serialNumber: string;
  purchaseDate: string;
  condition: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
}