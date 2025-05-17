import { TableCell } from '@mui/material';
import Chip from "@mui/material/Chip"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import type { Job } from '~/data/jobs/Job';
import { useFormatDate } from '~/services/utils';

export interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({jobs}: JobsTableProps) {
  const slice = jobs.slice(0, 3);
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
                job.customer && (
                  `${job.customer.firstName} ${job.customer.lastName}`
                )
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
