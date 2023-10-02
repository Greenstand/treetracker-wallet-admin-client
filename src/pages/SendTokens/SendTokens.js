import React, { useContext, useState } from 'react';
import { Paper } from '@mui/material';
import {
  ContentContainer,
  LoaderContainer,
  StyledGrid,
} from './SendTokensStyled';
import PageHeader from '../../components/layout/PageHeader/PageHeader';
import SendTokensForm from './SendTokensForm/SendTokensForm';
import Message, {
  MessageType,
} from '../../components/UI/components/Message/Message';
import apiClient from '../../utils/apiClient';
import { Loader } from '../../components/UI/components/Loader/Loader';
import TokenInfoBlock from './TokenInfoBlock/TokenInfoBlock';
import { formatWithCommas } from '../../utils/formatting';
import AuthContext from '../../store/auth-context';

const SendTokens = () => {
  const [createdWalletName, setCreatedWalletName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [senderWalletName, setSenderWalletName] = useState();
  const [senderWalletTokens, setSenderWalletTokens] = useState(0);

  const authContext = useContext(AuthContext);

  // TODO: uncomment when API is ready: is should have a totalTokens value
  // const [totalTokensAmount, setTotalTokensAmount] = useState();

  // const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   getTotalTokensAmount();
  // }, []);

  // const getTotalTokensAmount = () => {
  //   // LocalStorage should have some wallet info after the login
  //   const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  //   if (!wallet || !wallet.id) {
  //     console.log('Wallet info not found in the localStorage');
  //     authContext.logout();
  //     return;
  //   }

  //   //setIsLoading(true);
  //   apiClient
  //     .get('/wallets/' + wallet.id)
  //     .then((response) => {
  //       setTotalTokensAmount(response.data.tokens_in_wallet);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       setErrorMessage('An error occurred while fetching wallet data.');
  //     })
  //     .finally(() => {
  //       //setIsLoading(false);
  //     });
  // };

  const handleSendTokenForm = (data) => {
    setIsLoading(true);

    apiClient
      .setAuthHeader(authContext.token)
      .post('/transfers', {
        bundle: { bundle_size: data.tokensAmount },
        sender_wallet: data.senderWallet,
        receiver_wallet: data.receiverWallet,
        claim: false,
      })
      .then((response) => {
        console.log(
          'Tokens transfer completed. Response: ' + JSON.stringify(response)
        );

        // update tokens amount: total and sender's wallet token
        // TODO: uncomment when API is ready: is should have a totalTokens value
        // getTotalTokensAmount();
        setSenderWalletTokens((prev) => prev - data.tokensAmount);

        setErrorMessage('');
        setSuccessMessage(
          `${data.tokensAmount} tokens were successfully sent from '${data.senderWallet}' to '${data.receiverWallet}' wallet. Status of the transfer: '${response.data.state}'`
        );
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('');
        const errorMessage =
          error.response.data.message ===
          'Cannot transfer to the same wallet as the originating one!'
            ? error.response.data.message
            : 'An error occurred while sending tokens.';
        setErrorMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCreateWalled = (name) => {
    if (!name) return;

    setIsLoading(true);

    apiClient
      .setAuthHeader(authContext.token)
      .post('/wallets', {
        wallet: name,
      })
      .then(() => {
        setErrorMessage('');
        setSuccessMessage(`Wallet ${name} created successfully!`);
        setCreatedWalletName(name);
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage('');
        const errorMessage =
          error.response.status === 403 &&
          error.response.data.message.includes('already exists')
            ? 'Wallet with this name already exists.'
            : 'An error occurred while creating a wallet.';
        setErrorMessage(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <StyledGrid>
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
        <Paper
          className="box"
          elevation={3}
          style={{
            width: '100%',
            height: '60vh',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {isLoading && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}
          <SendTokensForm
            onSubmit={handleSendTokenForm}
            onCreateWallet={handleCreateWalled}
            createdWalletName={createdWalletName}
            onSenderWalletSelected={(wallet) => {
              if (!wallet) {
                setSenderWalletName(null);
                setSenderWalletTokens(null);
                return;
              }

              setSenderWalletName(wallet.name);
              setSenderWalletTokens(wallet.tokensInWallet);
            }}
          />
          <TokenInfoBlock
            // totalTokens={formatWithCommas(totalTokensAmount)}
            senderWalletName={senderWalletName}
            senderWalletTokens={formatWithCommas(senderWalletTokens)}
          />
        </Paper>
      </ContentContainer>
    </StyledGrid>
  );
};

export default SendTokens;
