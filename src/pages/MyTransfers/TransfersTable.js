import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead, TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { DateRangeFilter, TransferFilter } from './TableFilters';
import { TableCellStyled } from './TransfersTable.styled';

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
                       getStatusColor,
                     }) => {
  return (
    <Grid item container sx={{ paddingBottom: '15px' }}>
      <Grid item xs={7} sx={{ display: 'flex', alignItems: 'end' }}>
        <Typography variant={'h4'}>
          {tableTitle}
        </Typography>
      </Grid>
      <Grid item container xs={5}>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TransferFilter
            transferFilterValue={transferFilterValue}
            setTransferFilterValue={setTransferFilterValue}
            statusList={statusList}
            getStatusColor={getStatusColor}
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


const TransfersTable = ({
                          tableTitle,
                          tableColumns,
                          tableRows,
                          rowsPerPage,
                          setRowsPerPage,
                          page,
                          setPage,
                        }) => {
  // filter values
  const [transferFilterValue, setTransferFilterValue] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // pagination
  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // status value color must match the menuitem color
  // 'None' option has a default color
  const getStatusColor = (status) => {
    return statusList.find(x => x.value === status).color;
  };

  return (
    <Grid container direction={'column'}>
      <TableHeader
        tableTitle={tableTitle}
        transferFilterValue={transferFilterValue}
        setTransferFilterValue={setTransferFilterValue}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        getStatusColor={getStatusColor}
      />

      <TableContainer component={Paper} sx={{ height: '400px', width: '1000px' }}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='transfers table'>
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
            {tableRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => {
              return (
                <TableRow key={rowIndex}>
                  {tableColumns.map((column, colIndex) => {
                    return (
                      <TableCellStyled key={`${rowIndex}-${colIndex}-${column.description}`}
                                       sx={{
                                         color: column.name === 'status'
                                           ? getStatusColor(row[column.name])
                                           : '',
                                       }}
                      >
                        {row[column.name]}
                      </TableCellStyled>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50]}
        component={'div'}
        count={tableRows.length}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPage}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
      />
    </Grid>);
};

export default TransfersTable;