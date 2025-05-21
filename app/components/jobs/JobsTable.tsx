import { Chip, TableBody, TableCell } from '@mui/material';
import Table from "@mui/material/Table"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { shallowEqual } from 'react-redux';
import { selectJobsWithCustomer } from '~/data/jobs/Jobs.selectors';
import { useAppSelector } from '~/data/store/root-hooks';
import { useFormatDate } from '~/services/utils';

export interface JobsTableProps {
  limit?: number;
}

export function JobsTable({limit}: JobsTableProps) {
  const jobs = useAppSelector(selectJobsWithCustomer, shallowEqual);
  const slice = limit ? jobs.slice(0, limit) : jobs;
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Job ID</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {slice.map((job) => (
            <TableRow key={job.id}>
              <TableCell component="th" scope="row" sx={{ fontWeight: "medium" }}>
                {job.id}
              </TableCell>
              <TableCell>{
                job.customer && (job.customer.name)
              }</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{useFormatDate(job.startDate)}</TableCell>
              <TableCell>
                <Chip label={job.status} color={job.status === "InProgress" ? "primary" : "default"} size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
