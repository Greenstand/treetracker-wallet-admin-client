import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
  } from '@mui/material';
  import React, { useEffect, useRef, useState } from 'react';
  import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
  import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
  import { DateRangeFilter, ResetButton, TransferSelectFilter } from './TableFilters';
  import { TableCellStyled, TooltipStyled } from './TransfersTable.styled';
  import { useTransfersContext } from '../../store/TransfersContext';
  import { Loader } from '../../components/UI/components/Loader/Loader';
  import TransferSidePanel from './TransferSidePanel';
  
  /**@function
   * @name TableHeader
   * @description Renders the table header (title, filters) for the transfers table
   * @param {string} tableTitle Name of the table to be displayed
   * @param {function} getStatusColor returns color corresponding to transfer state value
   *
   * @returns {JSX.Element} - Table header component
   */
  const TransfersTableHeader = ({ tableTitle, getStatusColor }) => {
    const { filter, setFilter, statusList, defaultFilter } = useTransfersContext();
  
    return (
      <Grid item container sx={{ paddingBottom: '15px' }}>
        <Grid item xs={6} sx={{ display: 'flex', alignItems: 'end' }}>
          <Typography variant={'h4'}>{tableTitle}</Typography>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TransferSelectFilter
              filter={filter}
              setFilter={setFilter}
              statusList={statusList}
              getStatusColor={getStatusColor}
            />
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DateRangeFilter filter={filter} setFilter={setFilter} />
          </Grid>
          <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'end' }}>
            <ResetButton setFilter={setFilter} defaultFilter={defaultFilter} />
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
      setIsOverflown(
        textElementRef.current.scrollWidth > textElementRef.current.clientWidth,
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
   * @name TransfersTableBody
   * @description Renders the table body (table rows) for the transfers table
   * @param tableColumns
   * @param tableRows
   * @param getStatusColor
   * @param selectedRowIndex
   * @param setSelectedRowIndex
   * @return {JSX.Element} - Table body component
   */
  const TransfersTableBody = ({ 
    tableColumns, 
    tableRows, 
    getStatusColor,
    selectedRowIndex,
    setSelectedRowIndex,
  }) => {
    const { isLoading, managedWallets } = useTransfersContext();
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [rowInfo, setRowInfo] = useState(null);
    const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');

    const handleClosePanel = () => {
      setIsSidePanelOpen(false);
      setSelectedRowIndex(null);
    };

    const handleRowClick = (rowIndex, row) => {
      setRowInfo(row);
      setSelectedRowIndex(rowIndex);
      // Only open side panel for pending transfers
      if (row.status === 'pending') {
        setIsSidePanelOpen(true);
      }
    };

    // Check if a row requires user action (pending transfer where user can accept/decline)
    const requiresAction = (row) => {
      if (row.status !== 'pending') return false;
      const managedWalletsWithDefault = managedWallets.wallets ? managedWallets : { ...managedWallets, wallets: [] };
      const receiverWallet = row.receiver_wallet || row.destination_wallet;
      return (
        receiverWallet &&
        (wallet.name === receiverWallet ||
        managedWalletsWithDefault.wallets.some(w => w.name === receiverWallet))
      );
    };
  
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
      <>
        <TableBody>
          {tableRows &&
            tableRows.map((row, rowIndex) => {
              const isSelected = rowIndex === selectedRowIndex;
              const needsAction = requiresAction(row);
              return (
                <TableRow 
                  key={rowIndex}
                  onClick={() => handleRowClick(rowIndex, row)}
                  sx={{ 
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                  style={{
                    backgroundColor:
                      isSelected && needsAction
                        ? 'rgba(135, 195, 46, .4)'
                        : isSelected
                        ? 'rgba(135, 195, 46, .4)'
                        : needsAction
                        ? 'rgba(255, 122, 0, .1)'
                        : null,
                    border: needsAction ? '2px solid rgba(255, 122, 0, .5)' : 'none',
                  }}
                >
                  {tableColumns.map((column, colIndex) => {
                    const cellKey = `${rowIndex}-${colIndex}-${column.description}`;
                    const cellColor =
                      column.name === 'status'
                        ? getStatusColor(row[column.name])
                        : '';
                    const cellValue = row[column.name] || row[column.name] === 0
                      ? column.renderer
                        ? column.renderer(row[column.name])
                        : row[column.name]
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
        {isSidePanelOpen && (
          <TransferSidePanel
            open={isSidePanelOpen}
            rowInfo={rowInfo}
            onClose={handleClosePanel}
          />
        )}
      </>
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
  const TransfersTable = ({ tableTitle, tableRows, totalRowCount }) => {
    // get data from context
    const { pagination, setPagination, statusList, tableColumns, sorting, setSorting } =
      useTransfersContext();
  
    // State to track the index of the selected row
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);

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

    // Sorting - initialize from context
    const [sortBy, setSortBy] = useState(sorting?.sort_by || 'created_at');
    const [order, setOrder] = useState(sorting?.order || 'desc');

    // Sync local sorting state with context
    useEffect(() => {
      if (sorting) {
        setSortBy(sorting.sort_by);
        setOrder(sorting.order);
      }
    }, [sorting]);

    const getColumnNames = (columnName) => {
      let newSortBy = columnName;
      switch (columnName) {
        case 'created_date':
          newSortBy = 'created_at';
          break;
        case 'closed_date':
          newSortBy = 'closed_at';
          break;
        case 'status':
          newSortBy = 'state';
          break;
        default:
          newSortBy = columnName;
      }
      return newSortBy;
    };

    const mapSortBy = (columnName) => {
      let newSortBy = getColumnNames(columnName);
      setSortBy(newSortBy);
      return newSortBy;
    };

    const handleSort = (column) => {
      if (!column.sortable) return;

      let newOrder = 'asc';

      if (
        (sortBy === getColumnNames(column.name) ||
          (column.name === 'created_date' && sortBy === 'created_at') ||
          (column.name === 'closed_date' && sortBy === 'closed_at') ||
          (column.name === 'status' && sortBy === 'state')) &&
        order === 'asc'
      ) {
        newOrder = 'desc';
      }

      setOrder(newOrder);

      let newSortBy = mapSortBy(column.name);
      setSortBy(newSortBy);

      setSorting({
        sort_by: newSortBy,
        order: newOrder,
      });
    };
  
    // get color corresponding to the status value, else default color
    const getStatusColor = (status) => {
      const color = statusList.find((x) => x.value === status)?.color;
      return color ? color : '#585B5D';
    };
  
    return (
      <Grid container direction={'column'} sx={{ height: '100%' }}>
        <TransfersTableHeader
          tableTitle={tableTitle}
          getStatusColor={getStatusColor}
        />
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            sx={{ minWidth: 650 }}
            aria-label='transfers table'
            data-testid='transfers-table'
          >
            <TableHead>
              <TableRow>
                {tableColumns.map((column, id) => {
                  return (
                    <TableCellStyled
                      key={`${id}-${column.description}`}
                      sx={{ fontSize: '14px', cursor: column.sortable ? 'pointer' : 'default' }}
                      align={'center'}
                      onClick={() => column.sortable && handleSort(column)}
                    >
                      {column.description}
                      {column.sortable &&
                        sortBy === getColumnNames(column.name) && (
                          <>
                            {order === 'asc' && (
                              <ArrowUpwardIcon
                                style={{ verticalAlign: 'middle', marginLeft: '4px' }}
                              />
                            )}
                            {order === 'desc' && (
                              <ArrowDownwardIcon
                                style={{ verticalAlign: 'middle', marginLeft: '4px' }}
                              />
                            )}
                          </>
                        )}
                    </TableCellStyled>
                  );
                })}
              </TableRow>
            </TableHead>
            <TransfersTableBody
              tableColumns={tableColumns}
              tableRows={tableRows}
              getStatusColor={getStatusColor}
              selectedRowIndex={selectedRowIndex}
              setSelectedRowIndex={setSelectedRowIndex}
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
          data-testid='table-pagination'
        />
      </Grid>
    );
  };
  
  export default TransfersTable;