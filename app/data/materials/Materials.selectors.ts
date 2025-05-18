import { createSelector } from '@reduxjs/toolkit';
import type { AppRootState } from '~/data/store/root-store.config';

// Base selector to get the entire materials slice
const selectMaterialsSlice = (state: AppRootState) => state.materials;

// Memoized selector for filtered reorder materials
export const selectReorderMaterials = createSelector(
  [selectMaterialsSlice],
  (materialsState) => materialsState.materials.filter(m => m.needsReorder)
);

// Optional: Selector for loading state
export const selectMaterialsLoading = createSelector(
  [selectMaterialsSlice],
  (materialsState) => materialsState.loading
);

// Optional: Selector for error state
export const selectMaterialsError = createSelector(
  [selectMaterialsSlice],
  (materialsState) => materialsState.error
);