import { createContext, useContext, useState } from 'react';

const TransfersContext = createContext();

// transfers context provider
const TransfersProvider = (props) => {
  // pagination
  const defaultPagination = {
    page: 0,
    rowsPerPage: 10,
  };
  const [pagination, setPagination] = useState(defaultPagination);

  // filter
  const defaultFilter = {
    transferStatus: '',
    startDate: null,
    endDate: null,
  };
  const [filter, setFilter] = useState(defaultFilter);

  const value = {
    pagination,
    setPagination,
    filter,
    setFilter,
  };

  return (
    <TransfersContext.Provider value={value}>
      {props.children}
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