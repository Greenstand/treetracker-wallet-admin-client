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

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // wallets table columns
  const tableColumns = [
    {
      description: 'Wallet uuid',
      name: 'wallet_id',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Name',
      name: 'wallet_name',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Amount of Tokens',
      name: 'token_amount',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => formatWithCommas(val),
    },
    {
      description: 'Created Date',
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
