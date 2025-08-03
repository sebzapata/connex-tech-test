import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useInteractionStats } from '../../lib/api';

const Datatable = () => {
  const { data } = useInteractionStats();

  const interactionStats = data?.data.data;

  if (!interactionStats) return null;

  return (
    <TableContainer sx={{ maxHeight: 800 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Agent Name</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Interactions</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>
              Average Duration (seconds)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interactionStats.map((row) => (
            <TableRow
              key={`${row.interaction_date} ${row.agent_name}`}
              sx={{
                '&:nth-of-type(odd)': {
                  backgroundColor: 'white',
                },
                '&:nth-of-type(even)': {
                  backgroundColor: 'lightgrey',
                },
              }}
            >
              <TableCell>{row.interaction_date || 'Unknown'}</TableCell>
              <TableCell>{row.agent_name || 'Unknown'}</TableCell>
              <TableCell>{row.interaction_count || 'Unknown'}</TableCell>
              <TableCell>{row.average_length_seconds || 'Unknown'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Datatable;
