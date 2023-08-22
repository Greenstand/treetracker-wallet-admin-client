import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import WalletInfoBlock from './WalletInfoBlock/WalletInfoBlock';
import { ContentGrid, GridItem, WalletAbout, WalletAboutText, WalletAboutTitle } from './WalletStyled';
import { Loader } from '../../components/UI/components/Loader/Loader';
import Message from '../../components/UI/components/Message/Message';
import { MessageType } from '../../components/UI/components/Message/Message';
import AuthContext from '../../store/auth-context';
import { getWalletById } from '../../api/wallets';
import WalletHeader from './WalletHeader/WalletHeader';
import { getTransfers } from '../../api/transfers';
import TransferFilter from '../../models/TransferFilter';

const Wallet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const defaultWallet = {
    id: '',
    logoURL: '',
    tokensInWallet: 0,
    name: '',
    about: '',
  };

  const [wallet, setWallet] = useState(defaultWallet);
  const [pendingTransfers, setPendingTransfers] = useState(null);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    // LocalStorage should have some wallet info after the login
    const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
    if (!wallet || !wallet.id) {
      console.log('Wallet info not found in the localStorage');
      authContext.logout();
      return;
    }

    const fetchData = async () => {
      try {
        // get wallet data
        const returnedWalletData = await getWalletById(wallet.id);
        setWallet(returnedWalletData);

        // get pending transfers data
        const pendingTransferFilter = new TransferFilter({ state: 'pending' });
        const returnedTransferData = await getTransfers({
          filter: pendingTransferFilter,
        });
        setPendingTransfers(returnedTransferData.transfers);
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      padding: '12px',
    }}>
      <GridItem item sx={{ width: '100%', marginTop: '4rem' }}>
        {errorMessage && (
          <Message
            message={errorMessage}
            onClose={() => setErrorMessage('')}
            messageType={MessageType.Error}
          />
        )}
      </GridItem>

      <GridItem item sx={{
        width: 'fit-content',
      }}>
        <WalletHeader
          walletName={wallet.name}
          walletLogoURL={wallet.logoURL}
          pendingTransfers={pendingTransfers.length}
        />
      </GridItem>

      {wallet.about &&
        (<GridItem item>
          <WalletAbout elevation={0}>
            <WalletAboutTitle>About the wallet</WalletAboutTitle>
            <WalletAboutText>{wallet.about}</WalletAboutText>
          </WalletAbout>
        </GridItem>)
      }
      <GridItem item>
        <ContentGrid>
          <WalletInfoBlock
            title={`Wallet ${wallet.name}`}
            innerNumber={wallet.tokensInWallet}
            innerText='tokens'
          />
        </ContentGrid>
      </GridItem>
    </Grid>
  );
};

export default Wallet;
