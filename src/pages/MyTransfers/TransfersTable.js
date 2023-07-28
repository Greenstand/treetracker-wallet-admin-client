import {
  FormControl,
  Grid, MenuItem,
  Paper, Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { ArrowDropDownIcon, FilterLabelText, SelectMenuItem, SelectFilter } from './TransfersTable.styled';
import { DatePicker } from '@mui/x-date-pickers';


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

const TransferFilter = ({ transferFilterValue, setTransferFilterValue }) => {

  // select value color must match the menuitem color
  // 'None' option has a default color
  const getSelectColor = () => {
    return transferFilterValue
      ? statusList.find(x => x.value === transferFilterValue).color
      : '#585B5D';
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Transfer Status</FilterLabelText>

      <SelectFilter
        displayEmpty
        value={transferFilterValue}
        onChange={(e) => setTransferFilterValue(e.target.value)}
        IconComponent={ArrowDropDownIcon}
        sx={{
          color: getSelectColor(),
        }}
      >
        <SelectMenuItem value={''}>None</SelectMenuItem>

        {statusList.map((status, index) => <SelectMenuItem key={index} value={status.value}
                                                           sx={{ color: status.color }}>{status.label}</SelectMenuItem>)}
      </SelectFilter>
    </FormControl>);
};

const DateRangeFilter = () => {
  return (
    <FormControl>
      <Select>
        <MenuItem>
          <DatePicker />
        </MenuItem>
      </Select>
    </FormControl>

  );
};

const TableHeader = ({ tableTitle, transferFilterValue, setTransferFilterValue }) => {
  return (
    <Grid item sx={{ paddingBottom: '15px' }}>
      <Typography variant={'h4'}>
        {tableTitle}
      </Typography>
      <TransferFilter
        transferFilterValue={transferFilterValue}
        setTransferFilterValue={setTransferFilterValue}
      />
      <DateRangeFilter />
    </Grid>

  );
};


const TransfersTable = ({ tableTitle, tableColumns }) => {

  const [tranferFilterValue, setTransferFilterValue] = useState('');

  return (<Grid container direction={'column'}>
    <TableHeader tableTitle={tableTitle} transferFilterValue={tranferFilterValue}
                 setTransferFilterValue={setTransferFilterValue} />
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