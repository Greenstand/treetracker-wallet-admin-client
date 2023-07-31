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
import { DateRangeFilter, TransferSelectFilter } from './TableFilters';
import { TableCellStyled } from './TransfersTable.styled';
import { useTransfersContext } from '../../store/TransfersContext';

/**@function
 * @name TableHeader
 * @description Renders the table header (title, filters) for TransfersTable
 * @param {string} tableTitle Name of the table to be displayed
 * @param {function} getStatusColor returns color corresponding to transfer state value
 *
 * @returns {JSX.Element} - Table header component
 */
const TableHeader = ({
                       tableTitle,
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
          <TransferSelectFilter
            getStatusColor={getStatusColor}
          />
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DateRangeFilter />
        </Grid>
      </Grid>
    </Grid>
  );
};


/**@function
 * @name TransfersTable
 * @description Renders the transfers table
 * @param {string} tableTitle Name of the table to be displayed
 * @param {object} tableColumns Array of table column objects to be displayed
 * @param {object} tableRows Array of table row objects to be displayed
 *
 * @returns {JSX.Element} - transfer table component
 */
const TransfersTable = ({
                          tableTitle,
                          tableColumns,
                          tableRows,
                        }) => {

  // get pagination object from context
  const { pagination, setPagination, statusList } = useTransfersContext();

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);

    const newPagination = {
      limit: newRowsPerPage,
      offset: 0,
    };
    setPagination(newPagination);
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
    const newPagination = { ...pagination, offset: newPage * rowsPerPage };
    setPagination(newPagination);
  };

  // get color corresponding to the status value, else default color
  const getStatusColor = (status) => {
    const color = statusList.find(x => x.value === status).color;
    return color ? color : '#585B5D';
  };

  return (
    <Grid container direction={'column'}>
      <TableHeader
        tableTitle={tableTitle}
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
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={(e, newPage) => handlePageChange(e, newPage)}
      />
    </Grid>);
};

export default TransfersTable;