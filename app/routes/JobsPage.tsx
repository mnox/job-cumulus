import { useEffect } from 'react';
import { JobsTable } from '~/components/jobs/JobsTable';
import { fetchCustomers } from '~/data/customers/Customers.slice';
import { fetchJobs } from '~/data/jobs/Jobs.slice';
import { useAppDispatch } from '~/data/store/root-hooks';

export default function JobsPage() {
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
    <JobsTable />
  )
}