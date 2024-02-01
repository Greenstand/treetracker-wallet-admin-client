import { createContext, useContext, useState } from 'react';
import { formatWithCommas, getDateText } from '../utils/formatting';

const WalletsContext = createContext();

// wallets context provider
const WalletsProvider = ({ children }) => {
  // pagination
  const defaultPagination = {
    limit: 10,
    offset: 0,
  };
  const [pagination, setPagination] = useState(defaultPagination);

  // sorting
  const defaultSorting = {
    sortBy: 'created_at',
    order: 'desc',
  };
  const [sorting, setSorting] = useState(defaultSorting);

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // wallets table columns
  const tableColumns = [
    {
      description: 'Wallet Id',
      name: 'wallet_id',
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Name',
      name: 'wallet_name',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Number of tokens in wallet',
      name: 'token_amount',
      sortable: false,
      showInfoIcon: false,
      renderer: (val) => formatWithCommas(val),
    },
    {
      description: 'Created at date',
      name: 'created_date',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
    },
  ];

  // transform API returned data into rows compatible with the wallets table
  const prepareRows = (returnedRows) => {
    return returnedRows.map((row) => {
      return {
        wallet_id: row.id,
        wallet_name: row.name,
        token_amount: row.tokensInWallet,
        created_date: row.created_at,
      };
    });
  };

  const value = {
    pagination,
    setPagination,
    sorting,
    setSorting,
    isLoading,
    setIsLoading,
    tableColumns,
    prepareRows,
  };

  return (
    <WalletsContext.Provider value={value}>{children}</WalletsContext.Provider>
  );
};

// hook to return wallets context
const useWalletsContext = () => {
  const context = useContext(WalletsContext);
  if (!context)
    throw new Error('useWalletsContext must be used within WalletsProvider');
  return context;
};

export { WalletsProvider, useWalletsContext };
