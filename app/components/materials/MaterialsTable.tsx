import InventoryIcon from "@mui/icons-material/Inventory"
import SearchIcon from "@mui/icons-material/Search"
import {
  Chip,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  type SelectChangeEvent,
  Stack,
  TableCell,
  TableSortLabel,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import * as React from 'react';
import { useEffect, useState } from 'react';
import { type Material, type MaterialCategory } from '~/data/materials/Material';
import { useAppSelector } from '~/data/store/root-hooks';

interface TableDisplayMaterial extends Material {
  needsReorder: boolean;
}

enum DisplayModes {
  All = 'All',
  LowInventory = 'LowInventory',
}
type DisplayMode = keyof typeof DisplayModes;

type SortColumn = 'category' | 'quantityInStock' | 'supplier' | 'needsReorder';
type SortDirection = 'asc' | 'desc';

export default function MaterialsTable() {
  const [mode, setMode] = useState<DisplayMode>(DisplayModes.All);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [displayMaterials, setdisplayMaterials] = useState<Material[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [allCategories, setAllCategories] = useState<MaterialCategory[]>([]);
  
  const materialsSlice = useAppSelector(state => state.materials);
  useEffect( () => {
    if(materialsSlice.materials) {
      setMaterials(materialsSlice.materials);
    }
  }, [ materialsSlice ] );
  
  // Extract unique categories from materials
  useEffect( () => {
    const categories = [...new Set(materials.map(m => m.category))];
    setAllCategories(categories);
  }, [ materials ] );
  
  // Handle mode toggle
  const handleModeChange = (_event: React.MouseEvent<HTMLElement>, newMode: DisplayMode) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };
  
  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  
  // Handle category selection
  const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  
  // Handle column sorting
  const handleSort = (column: SortColumn) => {
    const isAsc = sortColumn === column && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortColumn(column);
  };
  
  // Sort function
  const sortMaterials = (materials: Material[]) => {
    if (!sortColumn) return materials;
    
    return [...materials].sort((a, b) => {
      let comparison = 0;
      
      switch (sortColumn) {
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'quantityInStock':
          comparison = a.quantityInStock - b.quantityInStock;
          break;
        case 'supplier':
          comparison = a.supplier.localeCompare(b.supplier);
          break;
        case 'needsReorder':
          const aReorder = a.quantityInStock <= a.reorderPoint;
          const bReorder = b.quantityInStock <= b.reorderPoint;
          comparison = aReorder === bReorder ? 0 : aReorder ? -1 : 1;
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };
  
  const materialMeetsSearch = (material: Material) => {
    const query = searchQuery.toLowerCase();
    return !query.length || !![
      material.name.toLowerCase(),
      material.sku.toLowerCase(),
      material.supplier.toLowerCase(),
    ].find(term => term.includes(query));
  }
  
  const materialMeetsCategories = (material: Material) => {
    return !selectedCategories.length || selectedCategories.includes(material.category);
  }
  
  const materialMeetsDisplayMode = (material: Material) => {
    return mode === DisplayModes.All || material.needsReorder;
  }
  
  // Filter and sort materials when dependencies change
  useEffect(() => {
    const materials = materialsSlice.materials || [];
    
    const filteredMaterials = materials.filter(material => {
      return materialMeetsDisplayMode(material)
        && materialMeetsSearch(material)
        && materialMeetsCategories(material);
    });
    
    const sortedMaterials = sortMaterials(filteredMaterials);
    setdisplayMaterials(sortedMaterials);
  }, [materialsSlice, mode, searchQuery, selectedCategories, sortColumn, sortDirection]);
  
  return (
    <Card>
      <CardHeader title="Materials Inventory"/>
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between' }}>
            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={handleModeChange}
              aria-label="display mode"
              size="small"
            >
              <ToggleButton value={DisplayModes.All} aria-label="all materials">
                All
              </ToggleButton>
              <ToggleButton value={DisplayModes.LowInventory} aria-label="low inventory">
                Low Inventory
              </ToggleButton>
            </ToggleButtonGroup>
            
            <TextField
              size="small"
              placeholder="Search by name, SKU, or supplier"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="category-filter-label">Categories</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                input={<OutlinedInput label="Categories" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} size="small" />
                    ))}
                  </Box>
                )}
              >
                {allCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          
          <Paper elevation={1}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Material</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === 'category'}
                        direction={sortColumn === 'category' ? sortDirection : 'asc'}
                        onClick={() => handleSort('category')}
                      >
                        Category
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">
                      <TableSortLabel
                        active={sortColumn === 'quantityInStock'}
                        direction={sortColumn === 'quantityInStock' ? sortDirection : 'asc'}
                        onClick={() => handleSort('quantityInStock')}
                      >
                        Quantity
                      </TableSortLabel>
                    </TableCell>
                    <TableCell align="right">Reorder Point</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === 'supplier'}
                        direction={sortColumn === 'supplier' ? sortDirection : 'asc'}
                        onClick={() => handleSort('supplier')}
                      >
                        Supplier
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === 'needsReorder'}
                        direction={sortColumn === 'needsReorder' ? sortDirection : 'asc'}
                        onClick={() => handleSort('needsReorder')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayMaterials.length > 0 ? (
                    displayMaterials.map((material) => {
                      const needsReorder = material.quantityInStock <= material.reorderPoint;
                      return (
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
                              icon={needsReorder ? <InventoryIcon fontSize="small" /> : undefined}
                              label={needsReorder ? 'Low Stock' : 'Happytime'}
                              color={needsReorder ? "error" : "default"}
                              variant={needsReorder ? "filled" : "outlined"}
                              size="small"
                              sx={{ minWidth: 100 }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        <Typography variant="body2" sx={{ py: 2 }}>
                          No materials found matching your criteria
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Stack>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth>
          Create Purchase Order
        </Button>
      </CardActions>
    </Card>
  );
}