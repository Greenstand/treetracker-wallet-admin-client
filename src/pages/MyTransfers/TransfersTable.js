import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DateRangeFilter, TransferFilter } from './TableFilters';

const statusList = [
  {
    label: 'Completed',
    value: 'Completed',
    color: '#86C232',
  },
  {
    label: 'Pending',
    value: 'Pending',
    color: 'black',
  },
  {
    label: 'Failed',
    value: 'Failed',
    color: 'red',
  },
];

const TableHeader = ({
                       tableTitle,
                       transferFilterValue,
                       setTransferFilterValue,
                       startDate,
                       setStartDate,
                       endDate,
                       setEndDate,
                     }) => {
  return (
    <Grid item container sx={{ paddingBottom: '15px' }}>
      <Grid item xs={7} sx={{ display: 'flex', alignItems: 'end' }}>
        <Typography variant={'h4'}>
          {tableTitle}
        </Typography>
      </Grid>
      <Grid container xs={5}>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TransferFilter
            transferFilterValue={transferFilterValue}
            setTransferFilterValue={setTransferFilterValue}
            statusList={statusList}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DateRangeFilter
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};


const TransfersTable = ({ tableTitle, tableColumns }) => {

  const [tranferFilterValue, setTransferFilterValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (<Grid container direction={'column'}>
    <TableHeader
      tableTitle={tableTitle}
      transferFilterValue={tranferFilterValue}
      setTransferFilterValue={setTransferFilterValue}
      startDate={startDate}
      endDate={endDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
    {/*<Grid>*/}
    {/*  <Paper elevation={3} sx={{ height: '400px', width: '1000px' }}>*/}
    {/*    */}
    {/*  </Paper>*/}
    {/*</Grid>*/}
    <TableContainer component={Paper} sx={{ height: '400px', width: '1000px' }}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {tableColumns.map((column, id) => {
              return (
                <TableCell key={`${id}-${column.description}`}
                           sx={{ fontSize: '14px' }}>{column.description}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>

        </TableBody>
      </Table>
    </TableContainer>
  </Grid>);
};

export default TransfersTable;