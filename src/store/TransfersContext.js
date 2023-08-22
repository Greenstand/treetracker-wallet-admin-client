import { createContext, useContext, useState } from 'react';
import TransferFilter from '../models/TransferFilter';
import { formatWithCommas, getDateText } from '../utils/formatting';
import { capitalize } from '@mui/material';

const TransfersContext = createContext();

// transfers context provider
const TransfersProvider = ({ children }) => {
  // pagination
  const defaultPagination = {
    limit: 10,
    offset: 0,
  };
  const [pagination, setPagination] = useState(defaultPagination);

  // filter
  // default filter is empty
  const defaultFilter = new TransferFilter({
    wallet: null,
    state: '',
    before: null,
    after: null,
  });
  const [filter, setFilter] = useState(defaultFilter);

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // transfer statuses
  const statusList = [
    {
      label: 'Requested',
      value: 'requested',
      color: 'black',
    },
    {
      label: 'Pending',
      value: 'pending',
      color: 'black',
    },
    {
      label: 'Completed',
      value: 'completed',
      color: '#86C232',
    },
    {
      label: 'Cancelled',
      value: 'cancelled',
      color: 'red',
    },
    {
      label: 'Failed',
      value: 'failed',
      color: 'red',
    },
  ];

  // transfers table columns
  const tableColumns = [
    {
      description: 'Transfer ID',
      name: 'transfer_id',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Sender Wallet',
      name: 'sender_wallet',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Token Amount',
      name: 'token_amount',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => formatWithCommas(val),
    },
    {
      description: 'Receiver Wallet',
      name: 'receiver_wallet',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Created Date',
      name: 'created_date',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
    },
    {
      description: 'Initiated By',
      name: 'initiated_by',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Closed Date',
      name: 'closed_date',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
    },
    {
      description: 'Status',
      name: 'status',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => capitalize(val),
    },

  ];

  // transform API returned data into rows compatible with the transfers table
  const prepareRows = (returnedRows) => {
    return returnedRows.map(row => {
      return {
        transfer_id: row.id,
        sender_wallet: row.source_wallet,
        token_amount: row.token_count,
        receiver_wallet: row.destination_wallet,
        created_date: row.created_at,
        initiated_by: row.originating_wallet,
        closed_date: row.closed_at,
        status: row.state,
      };
    });
  };


  const value = {
    pagination,
    setPagination,
    filter,
    defaultFilter,
    setFilter,
    statusList,
    isLoading,
    setIsLoading,
    tableColumns,
    prepareRows,
  };

  return (
    <TransfersContext.Provider value={value}>
      {children}
    </TransfersContext.Provider>
  );
};

// hook to return transfers context
const useTransfersContext = () => {
  const context = useContext(TransfersContext);
  if (!context) throw new Error('useTransfersContext must be used within TransfersProvider');
  return context;
};

export { TransfersProvider, useTransfersContext };