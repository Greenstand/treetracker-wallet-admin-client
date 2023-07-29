import React, { useState } from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
// import { CustomTableHeader } from './CustomTable';
import mockData from '../../mock_data.json';
import ErrorMessage from '../../components/UI/components/ErrorMessage/ErrorMessage';


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


const MyTransfers = () => {
  // pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  // error
  const [errorMessage, setErrorMessage] = useState('');


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
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          page={page}
          setPage={setPage}
        />
      </Grid>
    </div>);
};

export default MyTransfers;
