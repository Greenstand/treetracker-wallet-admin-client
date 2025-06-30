import { useContext, useState, useEffect } from 'react';
import { Paper, Tab, Tabs  } from '@mui/material';
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
import { Loader } from '../../components/UI/components/Loader/Loader';
import TokenInfoBlock from './TokenInfoBlock/TokenInfoBlock';
import SendToUntrustedWalletsForm from './SendTokensForm/SendToUntrustedWallets';
import AuthContext from '../../store/auth-context';
import TabPanel from '../../components/UI/components/TabPanel'
import { handleCreateWallet } from './helpers/walletHandlers';
// import { formatWithCommas } from '../../utils/formatting';
import { handleSendToUntrustedWallets } from './helpers/sendTokenHandlers';
import apiClient from '../../utils/apiClient';
import { getTrustedWallets } from '../../api/trust_relationships';
import { getPendingTransfers } from '../../api/wallets';



const SendTokens = () => {
  const [createdWalletName, setCreatedWalletName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const [senderWalletName, setSenderWalletName] = useState();
  const [senderWalletTokens, setSenderWalletTokens] = useState(0);
  const [senderWalletId, setSenderWalletId] = useState(null);
  const [pendingTransfers, setPendingTransfers] = useState(0);
  const [trustedWallets, setTrustedWallets] = useState([]);

  const authContext = useContext(AuthContext);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (tabValue === 1) {
      loadTrustedWallets();
    }
  }, [tabValue]);

  const loadTrustedWallets = async () => {
    try {
      setIsLoading(true);
      const wallets = await getTrustedWallets(authContext.token);
      setTrustedWallets(wallets);
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching trusted wallets.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingTransfers = async (walletId) => {
    try {
      const data = await getPendingTransfers(authContext.token, walletId);
      return data.pending_outgoing.total_amount || 0;
    } catch (error) {
      console.error('Error fetching pending transfers:', error);
      return 0; 
    }
  };

  const handleWalletSelection = async (wallet) => {
    if (!wallet) {
      setSenderWalletName(null);
      setSenderWalletTokens(null);
      setSenderWalletId(null);
      setPendingTransfers(0);
      return;
    }

    setSenderWalletName(wallet.name);
    setSenderWalletTokens(wallet.tokensInWallet);
    setSenderWalletId(wallet.id);

    const pendingAmount = await fetchPendingTransfers(wallet.id);
    setPendingTransfers(pendingAmount);
  };

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
        
        if (senderWalletId) {
          fetchPendingTransfers(senderWalletId).then(setPendingTransfers);
        }

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

  

  const callbacks = {
    setIsLoading,
    setErrorMessage,
    setSuccessMessage,
    setSenderWalletTokens,
    setCreatedWalletName,
    setPendingTransfers,
    fetchPendingTransfers
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
            flexDirection: 'column',
          }}
        >
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="wallet tabs">
            <Tab label="Managed Wallets" />
            <Tab label="Trusted Wallets" />
            <Tab label="Untrusted Wallets" />
          </Tabs>

          {isLoading && (
            <LoaderContainer>
              <Loader />
            </LoaderContainer>
          )}

          <TabPanel value={tabValue} index={0} style={{ flex: 1 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <SendTokensForm
                onSubmit={(data) => handleSendTokenForm(data, authContext, callbacks)}
                createdWalletName={createdWalletName}
                onCreateWallet={(name) => handleCreateWallet(name, authContext, callbacks)}
                onSenderWalletSelected={handleWalletSelection}
                walletType="managed"
                availableTokens={(senderWalletTokens || 0) - pendingTransfers}
              />
              <TokenInfoBlock
                inWallet={senderWalletTokens || 0}
                pendingTransfer={pendingTransfers}
                available={(senderWalletTokens || 0) - pendingTransfers}
                senderWalletName={senderWalletName}
              />
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={1} style={{ flex: 1 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <SendTokensForm
                onSubmit={(data) => handleSendTokenForm(data)}
                onSenderWalletSelected={handleWalletSelection}
                walletType="trusted"
                trustedWallets={trustedWallets}
                availableTokens={(senderWalletTokens || 0) - pendingTransfers}
              />
              <TokenInfoBlock
                inWallet={senderWalletTokens || 0}
                pendingTransfer={pendingTransfers}
                available={(senderWalletTokens || 0) - pendingTransfers}
                senderWalletName={senderWalletName}
              />
            </div>
          </TabPanel>

          <TabPanel value={tabValue} index={2} style={{ flex: 1 }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <SendToUntrustedWalletsForm
                onSubmit={(data) => handleSendToUntrustedWallets(data, authContext, callbacks)}
                onSenderWalletSelected={handleWalletSelection}
                availableTokens={(senderWalletTokens || 0) - pendingTransfers}
              />
              <TokenInfoBlock
                inWallet={senderWalletTokens || 0}
                pendingTransfer={pendingTransfers}
                available={(senderWalletTokens || 0) - pendingTransfers}
                senderWalletName={senderWalletName}
              />
            </div>
          </TabPanel>
        </Paper>
      </ContentContainer>
    </StyledGrid>
  );
};

export default SendTokens;