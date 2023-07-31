import { createContext, useContext, useState } from 'react';
import TransferFilter from '../models/TransferFilter';

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


  const value = {
    pagination,
    setPagination,
    filter,
    setFilter,
    statusList,
    isLoading,
    setIsLoading,
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