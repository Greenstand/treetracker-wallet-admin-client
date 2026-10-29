import React from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
import Message from '../../components/UI/components/Message/Message';
import { useTransfersContext } from '../../store/TransfersContext';

/**@function
 * @name MyTransfers
 * @description Renders the My Transfers page
 *
 * @returns {JSX.Element} - My Transfers page component
 * */
const MyTransfers = () => {
  // get data from context
  const { message, tableRows, totalRowCount, setMessage } =
    useTransfersContext();

  return (
    <div
      style={{
        marginTop: '5rem',
        marginLeft: '1rem',
        display: 'flex',
        flexDirection: 'column',
        marginRight: '1rem',
        width: '100%',
      }}
    >
      {message && <Message message={message} onClose={() => setMessage('')} />}
      <Grid container direction='column' sx={{ flexGrow: '1' }}>
        <TransfersTable
          tableTitle={'My Transfers'}
          tableRows={tableRows}
          totalRowCount={totalRowCount}
        />
      </Grid>
    </div>
  );
};

export default MyTransfers;