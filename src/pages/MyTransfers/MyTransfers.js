import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import TransfersTable from './TransfersTable';
import Message from '../../components/UI/components/Message/Message';
import { getTransfers } from '../../api/transfers';
import { useTransfersContext } from '../../store/TransfersContext';
import AuthContext from '../../store/auth-context';

/**@function
 * @name MyTransfers
 * @description Renders the My Transfers page
 *
 * @returns {JSX.Element} - My Transfers page component
 * */
const MyTransfers = () => {
  // get data from context
  const { pagination, filter, setIsLoading, prepareRows } =
    useTransfersContext();
  // error
  const [message, setMessage] = useState('');
  // data to be displayed in the table
  const [tableRows, setTableRows] = useState([]);
  // total rows count for pagination
  const [totalRowCount, setTotalRowCount] = useState(null);

  const authContext = useContext(AuthContext);

  // load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await getTransfers(authContext.token, {
          pagination,
          filter,
        });
        const preparedRows = prepareRows(await data.transfers);

        setTableRows(preparedRows);
        setTotalRowCount(data.total);
      } catch (error) {
        console.error(error);
        setMessage('An error occurred while fetching the table data');
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [pagination, filter]);

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
      <Grid container direction="column" sx={{ flexGrow: '1' }}>
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
