import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { JobsTable } from '~/components/jobs/JobsTable';
import { fetchCustomers } from '~/data/customers/Customers.slice';
import { selectJobsWithCustomer } from '~/data/jobs/Jobs.selectors';
import { fetchJobs } from '~/data/jobs/Jobs.slice';
import { useAppDispatch, useAppSelector } from '~/data/store/root-hooks';

export default function JobsPage() {
  const jobs = useAppSelector(selectJobsWithCustomer, shallowEqual);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    /**
     * I promise - I'd never do this in a production app
     * Just here for demonstrating the combined selector
     */
    dispatch(fetchJobs());
    dispatch(fetchCustomers());
  }, []);
  
  return (
    <JobsTable jobs={jobs} />
  )
}