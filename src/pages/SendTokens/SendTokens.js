/* eslint-disable */
import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/apiClient';
import { Loader } from '../../components/UI/components/Loader/Loader';
import { Grid, Paper } from '@mui/material';
import ErrorMessage from '../../components/UI/components/ErrorMessage/ErrorMessage';
import InfoCircle from './InfoCircle';

const SendTokens = () => {

  const [walletList, setWalletList] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  //when the page is first rendered
  useEffect(() => {
    const loadWallets = async () => {
      try {
        // TODO: default limit
        const wallets = await apiClient.get('/wallets?limit=200');
        setWalletList(wallets.data.wallets);
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadWallets();
  }, []);

  console.log('WALLET LIST:', walletList);

  if (isLoading) return <Loader />;

  const defaultWallet = walletList.length > 0 ? walletList[0] : {
    id: '',
    logo_url: '',
    tokens_in_wallet: 0,
    name: '',
  };

  return (
    <Grid>
      <header style={{ marginTop: '18vh', height: '10vh' }}>Send Tokens</header>
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <Paper elevation={3}>
        <h3>Wallet name : {defaultWallet.name}</h3>
        <div>
          <InfoCircle innerText={'Available tokens'} innerNumber={defaultWallet.tokens_in_wallet} />
        </div>

      </Paper>

    </Grid>


    // <div style={{ marginTop: '9.4vh' }}>SendTokens</div>
  );
};

export default SendTokens;
