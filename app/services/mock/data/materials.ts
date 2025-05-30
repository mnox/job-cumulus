import { type Material, MaterialCategories } from '~/data/materials/Material';

export const mockMaterials: Material[] = [
  {
    id: 1,
    name: "Oak Cabinet",
    description: "Premium oak kitchen cabinet",
    category: MaterialCategories.Lumber,
    sku: "CAB-OAK-001",
    unitOfMeasure: "unit",
    unitCost: 75,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 5,
    supplier: "Premium Cabinets Inc.",
    photos: ["/material-photos/oak-cabinet.jpg"],
  },
  {
    id: 2,
    name: "Ceramic Tile",
    description: "White ceramic bathroom tile",
    category: MaterialCategories.Tile,
    sku: "TILE-CER-001",
    unitOfMeasure: "sq ft",
    unitCost: 3.5,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 100,
    supplier: "Tile Warehouse",
    photos: ["/material-photos/ceramic-tile.jpg"],
  },
  {
    id: 3,
    name: "Granite Countertop",
    description: "Black granite kitchen countertop",
    category: MaterialCategories.Countertops,
    sku: "COUNT-GRN-001",
    unitOfMeasure: "unit",
    unitCost: 500,
    quantityInStock: Math.round(Math.random() * 10),
    reorderPoint: 2,
    supplier: "Stone Masters",
    photos: ["/material-photos/granite-countertop.jpg"],
  },
  {
    id: 4,
    name: "Asphalt Shingles",
    description: "Standard asphalt roof shingles",
    category: MaterialCategories.Roofing,
    sku: "ROOF-ASP-001",
    unitOfMeasure: "bundle",
    unitCost: 35,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 20,
    supplier: "Roofing Supply Co.",
    photos: ["/material-photos/asphalt-shingles.jpg"],
  },
  {
    id: 5,
    name: "Aluminum Gutter",
    description: "10ft aluminum gutter section",
    category: MaterialCategories.Gutters,
    sku: "GUT-ALU-001",
    unitOfMeasure: "section",
    unitCost: 25,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 10,
    supplier: "Gutter Guys",
    photos: ["/material-photos/aluminum-gutter.jpg"],
  },
  {
    id: 6,
    name: "Pressure Treated Lumber",
    description: "2x6x8 pressure treated lumber",
    category: MaterialCategories.Lumber,
    sku: "LUM-PT-001",
    unitOfMeasure: "board",
    unitCost: 15,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 50,
    supplier: "Lumber Yard",
    photos: ["/material-photos/pressure-treated-lumber.jpg"],
  },
  {
    id: 7,
    name: "Composite Decking",
    description: "12ft composite decking board",
    category: MaterialCategories.Composite,
    sku: "DECK-COMP-001",
    unitOfMeasure: "board",
    unitCost: 45,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 25,
    supplier: "Deck Supply Inc.",
    photos: ["/material-photos/composite-decking.jpg"],
  },
  {
    id: 8,
    name: "Interior Paint",
    description: "1 gallon interior latex paint",
    category: "Paint",
    sku: "PAINT-INT-001",
    unitOfMeasure: "gallon",
    unitCost: 45,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 10,
    supplier: "Paint Pros",
    photos: ["/material-photos/interior-paint.jpg"],
  },
  {
    id: 9,
    name: "Paint Roller Kit",
    description: "Paint roller with tray and covers",
    category: MaterialCategories.Paint,
    sku: "PAINT-SUP-001",
    unitOfMeasure: "kit",
    unitCost: 15,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 5,
    supplier: "Paint Pros",
    photos: ["/material-photos/paint-roller-kit.jpg"],
  },
  {
    id: 10,
    name: "Copper Pipe",
    description: "10ft copper pipe section",
    category: MaterialCategories.Plumbing,
    sku: "PLUMB-COP-001",
    unitOfMeasure: "section",
    unitCost: 30,
    quantityInStock: Math.round(Math.random() * 250),
    reorderPoint: 10,
    supplier: "Plumbing Supply",
    photos: ["/material-photos/copper-pipe.jpg"],
  },
]
