/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Grid, InputLabel, Paper } from '@mui/material';
import { ContentContainer, ContentGrid } from './SendTokensStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import SendTokensForm from './SendTokensForm/SendTokensForm';
import InfoCircle from './InfoCircle';
import ErrorMessage from '../../components/UI/components/ErrorMessage/ErrorMessage';
import apiClient from '../../utils/apiClient';
import { Loader } from '../../components/UI/components/Loader/Loader';

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
        setErrorMessage('An error occured while fetching wallet data.');
      } finally {
        setIsLoading(false);
      }
    };
    loadWallets();
  }, []);

  if (isLoading) return <Loader />;

  const defaultWallet =
    walletList.length > 0
      ? walletList[0]
      : {
          id: '',
          logo_url: '',
          tokens_in_wallet: 0,
          name: '',
        };

  return (
    <Grid style={{ width: '100%' }}>
      <PageHeader title="Send tokens" />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage('')}
        />
      )}
      <ContentContainer>
        {/* <ContentGrid> */}
        <Paper
          className="box"
          elevation={3}
          style={{ width: '60rem', height: '60vh' }}
        >
          <SendTokensForm />
        </Paper>
        {/* </ContentGrid> */}
      </ContentContainer>
      <Paper elevation={3}>
        <div>
          <InfoCircle
            innerText={'Available tokens'}
            innerNumber={defaultWallet.tokens_in_wallet}
          />
        </div>
      </Paper>
    </Grid>
  );
};

export default SendTokens;
