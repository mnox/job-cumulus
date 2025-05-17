import InventoryIcon from "@mui/icons-material/Inventory"
import { Chip, TableCell } from '@mui/material';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from 'react';
import { type Material } from '~/data/materials/Material';
import { useAppSelector } from '~/data/store/root-hooks';

interface TableDisplayMaterial extends Material {
  needsReorder: boolean;
}

enum DisplayModes {
  All= 'All',
  LowInventory = 'LowInventory',
}
type DisplayMode = keyof typeof DisplayModes;

export default function MaterialsTable() {
  const [mode, setMode] = useState<DisplayMode>(DisplayModes.All);
  const [materials, setMaterials] = useState<Material[]>([]);
  const materialsSlice = useAppSelector( state => state.materials );
  
  useEffect( () => {
    const displayMaterials = mode === DisplayModes.All
      ? materialsSlice.materials
      : materials.filter(m => m.needsReorder);
    
    setMaterials(displayMaterials);
  }, [materialsSlice, mode] );
  
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Material</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Reorder Point</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {materials.map((material) => (
            <TableRow key={material.id}>
              <TableCell component="th" scope="row" sx={{ fontWeight: "medium" }}>
                {material.sku}
              </TableCell>
              <TableCell>{material.name}</TableCell>
              <TableCell>{material.category}</TableCell>
              <TableCell align="right">{material.quantityInStock}</TableCell>
              <TableCell align="right">{material.reorderPoint}</TableCell>
              <TableCell>{material.supplier}</TableCell>
              <TableCell>
                <Chip
                  icon={material.needsReorder ? <InventoryIcon fontSize="small" /> : undefined}
                  label={material.needsReorder ? 'Low Stock' : 'Good'}
                  color={material.needsReorder ? "error" : "default"}
                  variant={material.needsReorder ? "filled" : "outlined"}
                  size="small"
                  sx={{ minWidth: 100 }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
