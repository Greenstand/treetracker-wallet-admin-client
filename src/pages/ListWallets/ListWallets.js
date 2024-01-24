import React, { useContext, useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import Message from '../../components/UI/components/Message/Message';
import { getWallets } from '../../api/wallets';
import AuthContext from '../../store/auth-context';
import { useWalletsContext } from '../../store/WalletsContext';
import Table from '../../components/UI/components/Table/Table';
import { Container } from './ListWallets.style';
import CreateManagedWallet from './CreateManagedWallet/CreateManagedWallet';

/**@function
 * @name ListWallets
 * @description Renders the List Wallets page
 *
 * @returns {JSX.Element} - List Wallets page component
 * */
const ListWallets = () => {
  const {
    pagination,
    setIsLoading,
    prepareRows,
    setPagination,
    tableColumns,
    isLoading,
  } = useWalletsContext();
  // error
  const [message, setMessage] = useState('');
  // data to be displayed in the table
  const [tableRows, setTableRows] = useState([]);
  // total rows count for pagination
  const [totalRowCount, setTotalRowCount] = useState(null);

  const authContext = useContext(AuthContext);

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

  // load data
  useEffect(() => {
    loadData();
  }, [pagination]);

  return (
    <Container>
      {message && <Message message={message} onClose={() => setMessage('')} />}
      <Grid
        container
        direction="column"
        sx={{ flexGrow: '1', display: 'flex', flexDirection: 'column' }}
      >
        <Grid item>
          <Typography variant={'h4'}>Managed Wallets List</Typography>
          <CreateManagedWallet loadData={loadData} />
        </Grid>
        <Grid item>
          <Table
            tableRows={tableRows}
            totalRowCount={totalRowCount}
            pagination={pagination}
            setPagination={setPagination}
            tableColumns={tableColumns}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListWallets;
