import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import {
  InteractionStats200DataItem,
  useInteractionStats,
} from '../../lib/api';

type Order = 'asc' | 'desc';

const databaseColumnToTableLabel = {
  interaction_date: 'Date',
  agent_name: 'Agent name',
  interaction_count: 'Interaction count',
  average_length_seconds: 'Average duration (seconds)',
};

const Datatable = () => {
  const { data } = useInteractionStats();

  const [orderDirection, setOrderDirection] = useState<Order>('asc');
  const [orderBy, setOrderBy] =
    useState<keyof InteractionStats200DataItem>('interaction_date');

  const interactionStats = data?.data.data;

  const visibleRows = React.useMemo(() => {
    function getComparator(
      order: Order,
      orderBy: keyof InteractionStats200DataItem
    ): (
      a: InteractionStats200DataItem,
      b: InteractionStats200DataItem
    ) => number {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }

    return [...(interactionStats || [])].sort(
      getComparator(orderDirection, orderBy)
    );
  }, [interactionStats, orderDirection, orderBy]);

  if (!interactionStats) return null;

  const handleRequestSort = (property: keyof InteractionStats200DataItem) => {
    const isAsc = orderBy === property && orderDirection === 'asc';

    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const aValue = a[orderBy] ?? '';
    const bValue = b[orderBy] ?? '';

    if (bValue < aValue) {
      return -1;
    }

    if (bValue > aValue) {
      return 1;
    }

    return 0;
  }

  const tableHeadNames = Object.keys(
    interactionStats[0]
  ) as (keyof InteractionStats200DataItem)[];

  return (
    <TableContainer sx={{ maxHeight: 800 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {tableHeadNames.map((tableHeadName) => (
              <TableCell
                sx={{ fontWeight: 'bold' }}
                sortDirection={
                  orderBy === tableHeadName ? orderDirection : false
                }
              >
                <TableSortLabel
                  active={orderBy === tableHeadName}
                  direction={orderBy === tableHeadName ? orderDirection : 'asc'}
                  onClick={() => handleRequestSort(tableHeadName)}
                >
                  {databaseColumnToTableLabel[tableHeadName]}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {visibleRows.map((row) => (
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
