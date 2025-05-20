import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useEffect } from 'react';
import MaterialsTable from '~/components/materials/MaterialsTable';
import { fetchMaterials } from '~/data/materials/Materials.slice';
import { useAppDispatch } from '~/data/store/root-hooks';

export default function MaterialsPage() {
  const dispatch = useAppDispatch();
  useEffect( () => {
    dispatch(fetchMaterials(false));
  }, [] );
  
  return (
    <Grid size={'grow'}>
      <MaterialsTable />
    </Grid>
  )
}