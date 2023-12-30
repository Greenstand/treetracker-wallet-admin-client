/* eslint-disable no-unused-vars */
import {
  Grid,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TableCellStyled, TooltipStyled } from './Table.styled';
import { Loader } from '../Loader/Loader';

/**@function
 * @name Header
 * @description Renders the table header (title, filters) for the table
 * @param {string} tableTitle Name of the table to be displayed
 * @param {function} getStatusColor returns color corresponding to wallets state value
 *
 * @returns {JSX.Element} - Table header component
 */
const Header = ({ tableTitle }) => {
  return (
    <Grid item container sx={{ paddingBottom: '15px' }}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end' }}>
        <Typography variant={'h4'}>{tableTitle}</Typography>
      </Grid>
    </Grid>
  );
};

/**@function
 * @name Body
 * @description Renders the table body (table rows) for the wallets table
 * @param tableColumns
 * @param tableRows
 * @return {JSX.Element} - Table body component
 */
const Body = ({ tableColumns, tableRows, isLoading }) => {
  if (isLoading) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12}>
            <Loader />
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (tableRows.length === 0)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12} sx={{ textAlign: 'center' }}>
            No data available
          </TableCell>
        </TableRow>
      </TableBody>
    );

  return (
    <TableBody>
      {tableRows &&
        tableRows.map((row, rowIndex) => {
          return (
            <TableRow key={rowIndex}>
              {tableColumns.map((column, colIndex) => {
                const cellKey = `${rowIndex}-${colIndex}-${column.description}`;
                const cellValue =
                  row[column.name] || row[column.name] === 0
                    ? column.renderer
                      ? column.renderer(row[column.name])
                      : row[column.name]
                    : '--';

                return (
                  <OverflownCell key={cellKey} cellValue={cellValue}>
                    {cellValue}
                  </OverflownCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  );
};

/**@function
 * @description Renders a table cell with a tooltip that shows when the cell is overflowed
 * @param {string} cellValue Value inside the cell and tooltip
 * @param {string} cellColor Color of the cell value
 * @param children
 * @return {JSX.Element}
 * @constructor
 */
const OverflownCell = ({ cellValue, cellColor, children }) => {
  const [isOverflown, setIsOverflown] = useState(false);
  const textElementRef = useRef();

  useEffect(() => {
    setIsOverflown(
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth
    );
  }, []);

  return (
    <TooltipStyled
      title={<p style={{ fontSize: '12px' }}>{cellValue}</p>}
      disableHoverListener={!isOverflown}
      arrow
    >
      <TableCellStyled
        ref={textElementRef}
        align={'center'}
        sx={{
          color: `${cellColor}`,
        }}
      >
        {children}
      </TableCellStyled>
    </TooltipStyled>
  );
};

/**@function
 * @name WalletsTable
 * @description Renders the wallets table
 * @param {string} tableTitle Name of the table to be displayed
 * @param {object} tableColumns Array of table column objects to be displayed
 * @param {object} tableRows Array of table row objects to be displayed
 *
 * @returns {JSX.Element} - wallets table component
 */
const Table = ({
  tableTitle,
  tableRows,
  totalRowCount,
  pagination,
  setPagination,
  tableColumns,
  isLoading,
}) => {
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

  return (
    <Grid container direction={'column'} sx={{ height: '100%' }}>
      <Header tableTitle={tableTitle} />
      <TableContainer component={Paper}>
        <MuiTable
          stickyHeader
          sx={{ minWidth: 650 }}
          aria-label="wallets table"
          data-testid="wallets-table"
        >
          <TableHead>
            <TableRow>
              {tableColumns.map((column, id) => {
                return (
                  <TableCellStyled
                    key={`${id}-${column.description}`}
                    sx={{ fontSize: '14px' }}
                    align={'center'}
                  >
                    {column.description}
                  </TableCellStyled>
                );
              })}
            </TableRow>
          </TableHead>
          <Body
            tableColumns={tableColumns}
            tableRows={tableRows}
            isLoading={isLoading}
          />
        </MuiTable>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50]}
        component={'div'}
        count={totalRowCount}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={(e, newPage) => handlePageChange(e, newPage)}
        data-testid="table-pagination"
      />
    </Grid>
  );
};

export default Table;
