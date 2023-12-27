import React, { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import WalletsTable from './WalletsTable';
import Message from '../../components/UI/components/Message/Message';
import { getWallets } from '../../api/wallets';
import AuthContext from '../../store/auth-context';
import { useWalletsContext } from '../../store/WalletsContext';

/**@function
 * @name ListWallets
 * @description Renders the List Wallets page
 *
 * @returns {JSX.Element} - List Wallets page component
 * */
const ListWallets = () => {
  const { pagination, setIsLoading, prepareRows } = useWalletsContext();
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
        const data = await getWallets(authContext.token, '', {
          pagination,
        });
        const preparedRows = prepareRows(await data.wallets);

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
  }, [pagination]);

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
        <WalletsTable
          tableTitle={'Managed Wallets List'}
          tableRows={tableRows}
          totalRowCount={totalRowCount}
        />
      </Grid>
    </div>
  );
};

export default ListWallets;
