/* eslint-disable no-unreachable */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Grid, InputLabel, Paper } from '@mui/material';
import { ContentContainer, ContentGrid } from './SendTokensStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import SendTokensForm from './SendTokensForm/SendTokensForm';
import InfoCircle from './InfoCircle';
import Message, {
  MessageType,
} from '../../components/UI/components/Message/Message';
import apiClient from '../../utils/apiClient';
import { Loader } from '../../components/UI/components/Loader/Loader';
import WalletContext from '../../store/wallet-context';

const mapWallet = (walletData) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData.name,
  };
};

const SendTokens = () => {
  const walletContext = useContext(WalletContext);
  const [walletList, setWalletList] = useState({});
  const [createdWalletName, setCreatedWalletName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('SendTokens.js rendered');
  }, []);

  const handleSendTokenForm = (data) => {
    // {{baseUrl}}/transfers

    apiClient
      .post('/wallets/transfers', {
        bundle: { bundle_size: data.tokensAmount },
        sender_wallet: data.senderWallet,
        receiver_wallet: data.receiverWallet,
        claim: false,
      })
      .then((response) => {
        if (response.state === 'completed') {
          alert('Success!');
        }
        // TODO: pending, ...
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('');
        setErrorMessage('An error occurred while fetching wallet data.');
      })
      .finally(() => {
        // setIsLoading(false);
      });
  };

  const handleCreateWalled = (name) => {
    if (!name) return;

    setIsLoading(true);

    apiClient
      .post('/wallets', {
        wallet: name,
      })
      .then(() => {
        setSuccessMessage(`Wallet ${name} created successfully!`);
        setCreatedWalletName(name);
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('');
        setErrorMessage('An error occurred while fetching wallet data.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const defaultWallet = walletContext.currentWallet;

  if (isLoading) return <Loader />;

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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {errorMessage && (
          <Message
            message={errorMessage}
            onClose={() => setErrorMessage('')}
            messageType={MessageType.Error}
          />
        )}
        {successMessage && (
          <Message
            message={successMessage}
            onClose={() => setSuccessMessage('')}
            messageType={MessageType.Success}
          />
        )}
      </div>
      <ContentContainer>
        {/* <ContentGrid> */}
        <Paper
          className="box"
          elevation={3}
          style={{ width: '60rem', height: '60vh' }}
        >
          <SendTokensForm
            onSubmit={handleSendTokenForm}
            onCreateWallet={handleCreateWalled}
            createdWalletName={createdWalletName}
          />
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
