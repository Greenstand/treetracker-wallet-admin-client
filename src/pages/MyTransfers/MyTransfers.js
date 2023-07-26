import React from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
// import { CustomTableHeader } from './CustomTable';


const transferColumns = [
  {
    description: 'Transfer ID',
    name: 'transfer_id',
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

const MyTransfers = () => {
  return <div style={{ marginTop: '5rem', marginLeft: '1rem' }}>
    {/*<Typography sx={{ fontWeight: 700, fontSize: '24px' }}>My Transfers</Typography>*/}
    <Grid container direction='column'>
      {/*<CustomTableHeader headerTitle={'My Transfers'} activeDateRange={'null'} />*/}
      <TransfersTable tableTitle={'My Transfers'} tableColumns={transferColumns} />

    </Grid>


  </div>;
};

export default MyTransfers;
