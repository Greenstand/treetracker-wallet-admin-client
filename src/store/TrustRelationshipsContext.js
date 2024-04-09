import { createContext, useContext, useState, useEffect } from 'react';
import { getDateText } from '../utils/formatting';
import AuthContext from './auth-context';
import { getTrustRelationships } from '../api/trust_relationships';
import TrustRelationshipsFilter from '../models/TrustRelationShipFilter';

const TrustRelationshipsContext = createContext();

// TrustRelationships context provider
const TrustRelationshipsProvider = ({ children }) => {
  // pagination
  const defaultPagination = {
    limit: 10,
    offset: 0,
  };

  const defaultFilter = new TrustRelationshipsFilter({
    state: '',
    type: '',
    requestType: '',
    before: null,
    after: null,
  });

  // sorting
  const defaultSorting = {
    sort_by: 'created_at',
    order: 'desc',
  };

  const [sorting, setSorting] = useState(defaultSorting);
  
  const [filter, setFilter] = useState(defaultFilter);

  const [pagination, setPagination] = useState(defaultPagination);

  const [searchString, setSearchString] = useState('')

  const [refetch, setRefetch] = useState(false);

  // Loader
  const [isLoading, setIsLoading] = useState(false);

  // trust relationships table columns

  const tableColumns = [
    {
      description: 'Id',
      name: 'id',
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Type',
      name: 'type',
      sortable: false,
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
      sortable: false,
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
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Source Wallet',
      name: 'actor_wallet',
      sortable: false,
      showInfoIcon: false,
    },
    {
      description: 'Target Wallet',
      name: 'target_wallet',
      sortable: false,
      showInfoIcon: false,
    }
  ];


  // transform API returned data into rows compatible with the trust relationship table
  const prepareRows = (returnedRows) => {
    return returnedRows.map(row => {
      return {
        id: row.id,
        type: row.type,
        state: row.state,
        request_type: row.request_type,
        created_at: row.created_at,
        updated_at: row.updated_at,
        originating_wallet: row.originating_wallet,
        actor_wallet: row.actor_wallet,
        target_wallet: row.target_wallet,
      };
    });
  };



  const statesList = [
    {
      label: 'Requested',
      value: 'requested',
      color: 'black',
    },
    {
      label: 'Trusted',
      value: 'trusted',
      color: 'black',
    }

  ];

  const requestTypeList = [
      {
        label: 'Manage',
        value: 'manage',
        color: 'black'
      },
      {
        label: 'Send',
        value: 'send',
        color: 'black'
      },
      {
        label: 'Deduct',
        value: 'deduct',
        color: 'black'
      }
  ]

  const typeList = [
    {
      label: 'Manage',
      value: 'manage',
      color: 'black'
    },
    {
      label: 'Send',
      value: 'send',
      color: 'black'
    },
    {
      label: 'Receive',
      value: 'receive',
      color: 'black'
    },
    {
      label: 'Deduct',
      value: 'deduct',
      color: 'black'
    },
    {
      label: 'Release',
      value: 'release',
      color: 'black'
    },
    {
      label: 'Yield',
      value: 'yield',
      color: 'black'
    }
  ]



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
         
         const data1 = await getTrustRelationships(authContext.token, {pagination, filter, sorting});


        const randomizeTrustState = (dataArray) => {
          // Directly manipulate only the trust_relationships part of dataArray
          let manipulatedTrustRelationships = dataArray.trust_relationships.map(item => ({
            ...item,
            state: Math.random() < 0.5 ? 'trusted' : 'requested' // Randomly assign state
          }));
        
          // Return the entire dataArray object with the updated trust_relationships
          return {
            ...dataArray,
            trust_relationships: manipulatedTrustRelationships
          };
        };
        
      
        const data = randomizeTrustState(data1);
       
        
         const preparedRows = prepareRows(await data.trust_relationships);
        //  console.log(tableRows)
         setTableRows(preparedRows);
         setTotalRowCount(data.total);
        //  console.log(data.trust_relationships)
         
       } catch (error) {
         console.error(error);
         setMessage('An error occurred while fetching the table data');
       }finally {
         setIsLoading(false);
         setRefetch(false);
        }
     };
     loadData();
   }, [pagination, filter, sorting, refetch]);



  const value = {
    pagination,
    setPagination,
    isLoading,
    setIsLoading,
    tableColumns,
    message,
    tableRows,
    totalRowCount,
    setMessage,
    statesList,
    requestTypeList,
    typeList,
    filter,
    setFilter,
    defaultFilter,
    searchString,
    setSearchString,
    setRefetch,
    sorting,
    setSorting,
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