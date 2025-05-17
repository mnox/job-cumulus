import type { CostFormula } from '~/data/costs/CostFormula';

export const mockFormulas: CostFormula[] = [
  {
    id: 1,
    name: "Basic Roofing Cost",
    description: "Standard formula for calculating roofing costs based on square footage",
    formula: "(squareFeet * materialCostPerSqFt) + (squareFeet * laborCostPerSqFt)",
    variables: [
      {
        name: "squareFeet",
        description: "Total square footage of the roof",
        defaultValue: 1000,
      },
      {
        name: "materialCostPerSqFt",
        description: "Cost of materials per square foot",
        defaultValue: 5.5,
      },
      {
        name: "laborCostPerSqFt",
        description: "Cost of labor per square foot",
        defaultValue: 3.5,
      },
    ],
    createdBy: 1,
    createdAt: "2023-01-10T09:30:00Z",
    updatedAt: "2023-01-10T09:30:00Z",
  },
  {
    id: 2,
    name: "Kitchen Remodel Estimate",
    description: "Formula for estimating kitchen remodel costs",
    formula: "baseCost + (cabinetCount * cabinetCost) + (countertopSqFt * countertopCostPerSqFt) + applianceCost",
    variables: [
      {
        name: "baseCost",
        description: "Base cost for labor and miscellaneous expenses",
        defaultValue: 5000,
      },
      {
        name: "cabinetCount",
        description: "Number of cabinets to be installed",
        defaultValue: 15,
      },
      {
        name: "cabinetCost",
        description: "Cost per cabinet",
        defaultValue: 300,
      },
      {
        name: "countertopSqFt",
        description: "Square footage of countertop",
        defaultValue: 30,
      },
      {
        name: "countertopCostPerSqFt",
        description: "Cost of countertop per square foot",
        defaultValue: 75,
      },
      {
        name: "applianceCost",
        description: "Total cost of appliances",
        defaultValue: 3000,
      },
    ],
    createdBy: 1,
    createdAt: "2023-02-15T14:45:00Z",
    updatedAt: "2023-03-10T11:30:00Z",
  },
  {
    id: 3,
    name: "Deck Construction Cost",
    description: "Formula for calculating deck construction costs",
    formula: "(deckSqFt * materialCostPerSqFt) + (deckSqFt * laborCostPerSqFt) + railingCost + stairCost",
    variables: [
      {
        name: "deckSqFt",
        description: "Square footage of the deck",
        defaultValue: 200,
      },
      {
        name: "materialCostPerSqFt",
        description: "Cost of decking material per square foot",
        defaultValue: 15,
      },
      {
        name: "laborCostPerSqFt",
        description: "Cost of labor per square foot",
        defaultValue: 10,
      },
      {
        name: "railingCost",
        description: "Total cost for railings",
        defaultValue: 1500,
      },
      {
        name: "stairCost",
        description: "Total cost for stairs",
        defaultValue: 800,
      },
    ],
    createdBy: 2,
    createdAt: "2023-03-20T10:15:00Z",
    updatedAt: "2023-03-20T10:15:00Z",
  },
  {
    id: 4,
    name: "Bathroom Renovation Cost",
    description: "Formula for estimating bathroom renovation costs",
    formula: "baseCost + (tileSqFt * tileCostPerSqFt) + fixturesCost + vanityCost + laborCost",
    variables: [
      {
        name: "baseCost",
        description: "Base cost for miscellaneous expenses",
        defaultValue: 2000,
      },
      {
        name: "tileSqFt",
        description: "Square footage of tile to be installed",
        defaultValue: 100,
      },
      {
        name: "tileCostPerSqFt",
        description: "Cost of tile per square foot",
        defaultValue: 10,
      },
      {
        name: "fixturesCost",
        description: "Total cost for fixtures (toilet, shower, etc.)",
        defaultValue: 1500,
      },
      {
        name: "vanityCost",
        description: "Cost for vanity and countertop",
        defaultValue: 1200,
      },
      {
        name: "laborCost",
        description: "Total labor cost",
        defaultValue: 3500,
      },
    ],
    createdBy: 1,
    createdAt: "2023-04-05T13:45:00Z",
    updatedAt: "2023-04-05T13:45:00Z",
  },
  {
    id: 5,
    name: "Interior Painting Cost",
    description: "Formula for calculating interior painting costs",
    formula: "(wallSqFt * paintCostPerSqFt) + (wallSqFt * laborCostPerSqFt) + suppliesCost",
    variables: [
      {
        name: "wallSqFt",
        description: "Square footage of walls to be painted",
        defaultValue: 800,
      },
      {
        name: "paintCostPerSqFt",
        description: "Cost of paint per square foot",
        defaultValue: 0.5,
      },
      {
        name: "laborCostPerSqFt",
        description: "Cost of labor per square foot",
        defaultValue: 2,
      },
      {
        name: "suppliesCost",
        description: "Cost for supplies (brushes, rollers, etc.)",
        defaultValue: 200,
      },
    ],
    createdBy: 2,
    createdAt: "2023-04-15T09:30:00Z",
    updatedAt: "2023-04-15T09:30:00Z",
  },
]
