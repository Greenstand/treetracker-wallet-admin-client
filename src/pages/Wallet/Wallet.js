import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import WalletInfoBlock from './WalletInfoBlock/WalletInfoBlock';
import { ContentContainer, ContentGrid } from './WalletStyled';
import { Loader } from '../../components/UI/components/Loader/Loader';
import Message from '../../components/UI/components/Message/Message';
import { MessageType } from '../../components/UI/components/Message/Message';
import AuthContext from '../../store/auth-context';

const mapWallet = (walletData) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData.wallet,
  };
};

const Wallet = () => {
  // const [wallet, setWallet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const defaultWallet = {
    id: '',
    logoURL: '',
    tokensInWallet: 0,
    name: '',
  };

  const [wallet, setWallet] = useState(defaultWallet);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    setIsLoading(true);

    // LocalStorage should have some wallet info after login
    const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
    if (!wallet || !wallet.id) {
      console.log('Wallet info not found in the localStorage');
      authContext.logout();
      return;
    }

    apiClient
      .get('/wallets/' + wallet.id)
      .then((response) => {
        const wallet = mapWallet(response.data);
        setWallet(wallet);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('An error occurred while fetching wallet data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid>
      <div>
        <header style={{ marginTop: '9.4vh', height: '10vh' }}>Wallet</header>
      </div>
      {errorMessage && (
        <Message
          message={errorMessage}
          onClose={() => setErrorMessage('')}
          messageType={MessageType.Error}
        />
      )}
      <ContentContainer maxWidth="false">
        <ContentGrid>
          <WalletInfoBlock
            title={`Wallet ${wallet.name}`}
            innerNumber={wallet.tokensInWallet}
            innerText="tokens"
          />
        </ContentGrid>
      </ContentContainer>
    </Grid>
  );
};

export default Wallet;
