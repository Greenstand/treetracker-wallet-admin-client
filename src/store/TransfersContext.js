import { createContext, useContext, useState } from 'react';
import TransferFilter from '../models/TransferFilter';

const TransfersContext = createContext();

// transfers context provider
const TransfersProvider = ({ children }) => {
  // pagination
  const defaultPagination = {
    page: 0,
    rowsPerPage: 10,
  };
  const [pagination, setPagination] = useState(defaultPagination);

  // filter
  // default filter is empty
  const defaultFilter = new TransferFilter({
    wallet: null,
    status: '',
    before: null,
    after: null,
  });
  const [filter, setFilter] = useState(defaultFilter);

  // transfer statuses
  const statusList = [
    {
      label: 'Requested',
      value: 'Requested',
      color: 'black',
    },
    {
      label: 'Pending',
      value: 'Pending',
      color: 'black',
    },
    {
      label: 'Completed',
      value: 'Completed',
      color: '#86C232',
    },
    {
      label: 'Cancelled',
      value: 'Cancelled',
      color: 'red',
    },
    {
      label: 'Failed',
      value: 'Failed',
      color: 'red',
    },
  ];


  const value = {
    pagination,
    setPagination,
    filter,
    setFilter,
    statusList,
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