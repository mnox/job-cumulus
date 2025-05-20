import { createSelector } from '@reduxjs/toolkit';
import { selectCustomers } from '~/data/customers/Customers.selectors';
import type { AppRootState } from '~/data/store/root-store.config';

const selectJobsSlice = (state: AppRootState) => state.jobs;

export const selectJobs = createSelector(
  [selectJobsSlice],
  (jobsState) => jobsState.jobs,
);

/**
 * Genuinely not sure if this is a bad place to define something like this.
 * In a typical production environment I'd never do exactly this because the relationship
 * would be hydrated by the API - but I wanted to demonstrate combining selectors.
 *
 * It feels like this is on the fringes of poor separation of concerns, but I ended up
 * going this direction because this is at least memoized and feels safer / cleaner than
 * just gluing the data together in a useEffect / component context.
 */
export const selectJobsWithCustomer = createSelector(
  [selectJobs, selectCustomers],
  (jobs, customers) => jobs.map(job => ({
    ...job,
    customer: customers.find(customer => customer.id === job.customerId),
  })),
)