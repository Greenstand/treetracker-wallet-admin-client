import { createContext, useContext, useState, useEffect } from 'react';
import { getDateText } from '../utils/formatting';
import AuthContext from './auth-context';
import { getTrustRelationships } from '../api/trust_relationships';

const TrustRelationshipsContext = createContext();

// transfers context provider
const TrustRelationshipsProvider = ({ children }) => {
  // pagination
  const defaultPagination = {
    limit: 10,
    offset: 0,
  };
  const [pagination, setPagination] = useState(defaultPagination);


  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // trust relationships table columns

  const tableColumns = [
    {
      description: 'Id',
      name: 'id',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Type',
      name: 'type',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'State',
      name: 'state',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Request Type',
      name: 'request_type',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Created_At',
      name: 'created_at',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
    },
    {
      description: 'Updated_At',
      name: 'updated_at',
      sortable: true,
      showInfoIcon: false,
      renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
    },
    {
      description: 'Originating Wallet',
      name: 'originating_wallet',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Source Wallet',
      name: 'actor_wallet',
      sortable: true,
      showInfoIcon: false,
    },
    {
      description: 'Target Wallet',
      name: 'target_wallet',
      sortable: true,
      showInfoIcon: false,
    }
  ];

  const randomStates = ['pending', 'decline', 'accepted','cancelled'];

  // transform API returned data into rows compatible with the trust relationship table
  const prepareRows = (returnedRows) => {
    return returnedRows.map(row => {
      return {
        id: row.id,
        type: row.type,
        // state: row.state,
        state: randomStates[(Math.floor(Math.random() * randomStates.length))],
        request_type: row.request_type,
        created_at: row.created_at,
        updated_at: row.updated_at,
        originating_wallet: row.originating_wallet,
        actor_wallet: row.actor_wallet,
        target_wallet: row.target_wallet,
      };
    });
  };



   // error
   const [message, setMessage] = useState('');
   // data to be displayed in the table
   const [tableRows, setTableRows] = useState([]);
 
 
   // total rows count for pagination
   const [totalRowCount, setTotalRowCount] = useState(null);
 
   const authContext = useContext(AuthContext);
 
 
   useEffect(() => {
     const loadData = async () => {
       try {
         setIsLoading(true);
         
         const data = await getTrustRelationships(authContext.token, {pagination});
 
         const preparedRows = prepareRows(await data.trust_relationships);
         setTableRows(preparedRows);
         setTotalRowCount(data.total);
         
       } catch (error) {
         console.error(error);
         setMessage('An error occurred while fetching the table data');
       }finally {
         setIsLoading(false);
        }
     };
     loadData();
   }, [pagination]);



  const value = {
    pagination,
    setPagination,
    isLoading,
    setIsLoading,
    tableColumns,
    message,
    tableRows,
    totalRowCount,
    setMessage
  };

  return (
    <TrustRelationshipsContext.Provider value={value}>
      {children}
    </TrustRelationshipsContext.Provider>
  );
};

// hook to return transfers context
const useTrustRelationshipsContext = () => {
  const context = useContext(TrustRelationshipsContext);
  if (!context) throw new Error('useTrustRelationshipsContext must be used within TrustRelationshipsProvider');
  return context;
};

export { TrustRelationshipsProvider, useTrustRelationshipsContext };