import Grid from '@mui/material/Grid';
import * as React from 'react';
import MaterialsTable from '~/components/materials/MaterialsTable';

export default function MaterialsPage() {
  return (
    <Grid size={'grow'}>
      <MaterialsTable />
    </Grid>
  )
}