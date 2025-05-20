import { createSelector } from '@reduxjs/toolkit';
import type { AppRootState } from '~/data/store/root-store.config';

const selectCustomersSlice = (state: AppRootState) => state.customers;

export const selectCustomers = createSelector(
  [selectCustomersSlice],
  (customersState) => customersState.customers,
);