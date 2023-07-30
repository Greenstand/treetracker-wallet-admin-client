import React, { useState } from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
import mockData from '../../mock_data.json';
import ErrorMessage from '../../components/UI/components/ErrorMessage/ErrorMessage';
// import { useTransfersContext } from '../../store/TransfersContext';

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
    name: 'sender_wallet',
    sortable: true,
    showInfoIcon: false,
  },
  {
    description: 'Token Amount',
    name: 'token_amount',
    sortable: true,
    showInfoIcon: false,
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
  },
  {
    description: 'Status',
    name: 'status',
    sortable: true,
    showInfoIcon: false,
  },

];

const statuses = ['Completed', 'Pending', 'Failed'];

const newData = mockData.map(x => {
  return {
    ...x,
    status: statuses[Math.floor(Math.random() * 3)],
  };
});

/**@function
 * @name MyTransfers
 * @description Renders the My Transfers page
 *
 * @returns {JSX.Element} - My Transfers page component
 * */
const MyTransfers = () => {
  // get pagination and filter from context
  // const { pagination, filter } = useTransfersContext();

  // error
  const [errorMessage, setErrorMessage] = useState('');
  // const [data, setData] = useState([]);

  // load data
  // useEffect(() => {
  //   const loadData = async () => {
  //     const { page, rowsPerPage } = pagination;
  //     const url = `https://dev-k8s.treetracker.org/query/v2/captures?limit=${rowsPerPage}&offset=${page * rowsPerPage}`;
  //     const returnedData = await axios.get(url);
  //     setData(returnedData.data);
  //   };
  //   loadData();
  // }, [pagination]);
  //
  // console.log('DATA', data);


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
          tableRows={newData.slice(1, 25)}
        />
      </Grid>
    </div>);
};

export default MyTransfers;
