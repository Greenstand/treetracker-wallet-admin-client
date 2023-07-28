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
    <Grid item sx={{ paddingBottom: '15px' }}>
      <Typography variant={'h4'}>
        {tableTitle}
      </Typography>
      <TransferFilter
        transferFilterValue={transferFilterValue}
        setTransferFilterValue={setTransferFilterValue}
        statusList={statusList}
      />
      <DateRangeFilter
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
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