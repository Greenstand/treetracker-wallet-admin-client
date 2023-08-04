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
import React, { useEffect, useRef, useState } from 'react';
import { DateRangeFilter, TransferSelectFilter } from './TableFilters';
import { TableCellStyled, TooltipStyled } from './TransfersTable.styled';
import { useTransfersContext } from '../../store/TransfersContext';
import { Loader } from '../../components/UI/components/Loader/Loader';

/**@function
 * @name TableHeader
 * @description Renders the table header (title, filters) for the transfers table
 * @param {string} tableTitle Name of the table to be displayed
 * @param {function} getStatusColor returns color corresponding to transfer state value
 *
 * @returns {JSX.Element} - Table header component
 */
const TransfersTableHeader = ({
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
    setIsOverflown(textElementRef.current.scrollWidth > textElementRef.current.clientWidth);
  }, []);

  return (
    <TooltipStyled
      title={<p style={{ fontSize: '12px' }}>{cellValue}</p>}
      disableHoverListener={!isOverflown}
      arrow
    >
      <TableCellStyled
        ref={textElementRef}
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
 * @name TransfersTableBody
 * @description Renders the table body (table rows) for the transfers table
 * @param tableColumns
 * @param tableRows
 * @param getStatusColor
 * @return {JSX.Element} - Table body component
 */
const TransfersTableBody = ({ tableColumns, tableRows, getStatusColor }) => {
  const { isLoading } = useTransfersContext();
  
  if (isLoading)
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={12}>
            <Loader />
          </TableCell>
        </TableRow>
      </TableBody>
    );

  return (
    <TableBody>
      {tableRows && tableRows.map((row, rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {tableColumns.map((column, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}-${column.description}`;
              const cellColor = column.name === 'status'
                ? getStatusColor(row[column.name])
                : '';
              const cellValue = row[column.name]
                ? (column.renderer
                  ? column.renderer(row[column.name])
                  : row[column.name])
                : '--';

              return (
                <OverflownCell
                  key={cellKey}
                  cellValue={cellValue}
                  cellColor={cellColor}
                >
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
                          tableRows,
                          totalRowCount,
                        }) => {

  // get data from context
  const { pagination, setPagination, statusList, tableColumns } = useTransfersContext();

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
      <TransfersTableHeader
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
          <TransfersTableBody
            tableColumns={tableColumns}
            tableRows={tableRows}
            getStatusColor={getStatusColor}
          />
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 50]}
        component={'div'}
        count={totalRowCount}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        page={page}
        onPageChange={(e, newPage) => handlePageChange(e, newPage)}
      />
    </Grid>);
};

export default TransfersTable;