import React, { useEffect, useState } from 'react';
import { capitalize, Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
// import mockData from '../../mock_data.json';
import ErrorMessage from '../../components/UI/components/ErrorMessage/ErrorMessage';
import { getTransfers } from '../../api/transfers';
import { useTransfersContext } from '../../store/TransfersContext';
import { formatWithCommas, getDateText } from '../../utils/formatting';

// columns of the transfers table
const transferColumns = [
  {
    description: 'Transfer ID',
    name: 'id',
    sortable: true,
    showInfoIcon: false,
  },
  {
    description: 'Sender Wallet',
    name: 'source_wallet',
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
    name: 'destination_wallet',
    sortable: true,
    showInfoIcon: false,
  },
  {
    description: 'Created Date',
    name: 'created_at',
    sortable: true,
    showInfoIcon: false,
    renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
  },
  {
    description: 'Initiated By',
    name: 'originating_wallet',
    sortable: true,
    showInfoIcon: false,
  },
  {
    description: 'Closed Date',
    name: 'closed_at',
    sortable: true,
    showInfoIcon: false,
    renderer: (val) => getDateText(val, 'MM/DD/YYYY'),
  },
  {
    description: 'Status',
    name: 'state',
    sortable: true,
    showInfoIcon: false,
    renderer: (val) => capitalize(val),
  },

];


// const statuses = ['Completed', 'Pending', 'Failed'];

// const newData = mockData.map(x => {
//   return {
//     ...x,
//     status: statuses[Math.floor(Math.random() * 3)],
//   };
// });

/**@function
 * @name MyTransfers
 * @description Renders the My Transfers page
 *
 * @returns {JSX.Element} - My Transfers page component
 * */
const MyTransfers = () => {
  // get pagination, filter, and loader from context
  const { pagination, filter, setIsLoading } = useTransfersContext();
  // error
  const [errorMessage, setErrorMessage] = useState('');
  // data to be displayed in the table
  const [tableRows, setTableRows] = useState([]);


  // load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getTransfers({ pagination, filter });
        setTableRows(await data.transfers ? data.transfers : data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching the table data');
      }
    };
    loadData();
  }, [pagination, filter]);


  return (
    <div style={{ marginTop: '5rem', marginLeft: '1rem' }}>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <Grid container direction='column'>

        <TransfersTable
          tableTitle={'My Transfers'}
          tableColumns={transferColumns}
          tableRows={tableRows}
        />
      </Grid>
    </div>);
};

export default MyTransfers;
