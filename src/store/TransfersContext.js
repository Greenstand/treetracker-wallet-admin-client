import { createContext, useContext, useState, useEffect } from 'react';
import TransferFilter from '../models/TransferFilter';
import { formatWithCommas, getDateText } from '../utils/formatting';
import { capitalize } from '@mui/material';
import AuthContext from './auth-context';
import { getTransfers, getPendingTransfers } from '../api/transfers';
import { getWallets } from '../api/wallets';

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

  const defaultSorting = {
    sort_by: 'created_at',
    order: 'desc',
  };
  const [sorting, setSorting] = useState(defaultSorting);

  const [isLoading, setIsLoading] = useState(false);

  const [count, setCount] = useState(0);

  const [refetch, setRefetch] = useState(false);

  const [managedWallets, setManagedWallets] = useState([]);

  const [tableRows, setTableRows] = useState([]);
  const [totalRowCount, setTotalRowCount] = useState(null);
  const [message, setMessage] = useState('');

  const authContext = useContext(AuthContext);
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');

  // transfer statuses
  const statusList = [
    // {
    //   label: 'Requested',
    //   value: 'requested',
    //   color: 'black',
    // },
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
    // {
    //   label: 'Failed',
    //   value: 'failed',
    //   color: 'red',
    // },
  ];

  // transfers table columns
  const tableColumns = [
    {
      description: 'Transfer ID',
      name: 'transfer_id',
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Sender Wallet',
      name: 'sender_wallet',
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Token Amount',
      name: 'token_amount',
      sortable: false,
      showInfoIcon: false,
      renderer: (val) => formatWithCommas(val),
    },
    {
      description: 'Receiver Wallet',
      name: 'receiver_wallet',
      sortable: false,
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
      sortable: false,
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
        id: row.id,
        sender_wallet: row.source_wallet,
        token_amount: row.token_count,
        receiver_wallet: row.destination_wallet,
        created_date: row.created_at,
        created_at: row.created_at,
        initiated_by: row.originating_wallet,
        closed_date: row.closed_at,
        closed_at: row.closed_at,
        status: row.state,
        state: row.state,
        source_wallet: row.source_wallet,
        destination_wallet: row.destination_wallet,
        originating_wallet: row.originating_wallet,
        token_count: row.token_count,
      };
    });
  };

  const getStatusPriority = (status) => {
    switch (status) {
      case 'pending':
        return 1;
      case 'completed':
        return 2;
      case 'cancelled':
        return 3;
      default:
        return 4;
    }
  };

  const sortRowsByDefaultOrder = (rows) => {
    return [...rows].sort((a, b) => {
      const statusPriorityA = getStatusPriority(a.status);
      const statusPriorityB = getStatusPriority(b.status);
      
      if (statusPriorityA !== statusPriorityB) {
        return statusPriorityA - statusPriorityB;
      }
      
      const dateA = new Date(a.created_at || a.created_date || 0);
      const dateB = new Date(b.created_at || b.created_date || 0);
      return dateB - dateA;
    });
  };

  const loadData = async () => {
    try {
      setIsLoading(true);

      const data = await getTransfers(authContext.token, {
        pagination,
        filter,
        sorting,
      });
      let preparedRows = prepareRows(await data.transfers);

      const isDefaultSort = 
        sorting.sort_by === defaultSorting.sort_by && 
        sorting.order === defaultSorting.order;
      
      if (isDefaultSort) {
        preparedRows = sortRowsByDefaultOrder(preparedRows);
      }

      setTableRows(preparedRows);
      setTotalRowCount(data.total);
    } catch (error) {
      console.error(error);
      setMessage('An error occurred while fetching the table data');
    } finally {
      setIsLoading(false);
      setRefetch(false);
    }
  };

  const loadPendingTransfersData = async () => {
    try {
      setIsLoading(true);

      const allWalletsData = await getWallets(authContext.token, '', {
        pagination: { limit: 1000 },
      });
      setManagedWallets(allWalletsData);

      let local_count = 0;
      const pendingTransfers = await getPendingTransfers(authContext.token);
      
      if (pendingTransfers && pendingTransfers.transfers) {
        for (const item of pendingTransfers.transfers) {
          if (wallet.name === item.destination_wallet) {
            local_count++;
          } else if (
            allWalletsData.wallets &&
            allWalletsData.wallets.some(
              (wallet) => wallet.name === item.destination_wallet
            )
          ) {
            local_count++;
          }
        }
      }
      setCount(local_count);
    } catch (error) {
      console.error(
        'An error occurred fetching the managed wallets and/or pending transfers',
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPendingTransfersData();
  }, [refetch]);

  useEffect(() => {
    loadData();
  }, [pagination, filter, sorting, refetch]);

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
    sorting,
    setSorting,
    count,
    refetch,
    setRefetch,
    managedWallets,
    tableRows,
    totalRowCount,
    message,
    setMessage,
    loadData,
  };

  return (
    <TransfersContext.Provider value={value}>
      {children}
    </TransfersContext.Provider>
  );
};

const useTransfersContext = () => {
  const context = useContext(TransfersContext);
  if (!context) throw new Error('useTransfersContext must be used within TransfersProvider');
  return context;
};

export { TransfersProvider, useTransfersContext };