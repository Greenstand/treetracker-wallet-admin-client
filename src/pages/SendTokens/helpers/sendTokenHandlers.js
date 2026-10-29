import apiClient from "../../../utils/apiClient";



export const handleSendTokenForm = async (data, authContext, callbacks) => {
  const { setIsLoading, setErrorMessage, setSuccessMessage, setSenderWalletTokens, refreshWalletData, senderWalletId } = callbacks;

  setIsLoading(true);

  try {
    const response = await apiClient
      .setAuthHeader(authContext.token)
      .post('/transfers', {
        bundle: { bundle_size: data.tokensAmount },
        sender_wallet: data.senderWallet,
        receiver_wallet: data.receiverWallet,
        claim: false,
      });

    console.log(
      'Tokens transfer completed. Response: ' + JSON.stringify(response)
    );

    if (senderWalletId && refreshWalletData) {
      await refreshWalletData(senderWalletId);
    } else {
      setSenderWalletTokens((prev) => prev - data.tokensAmount);
    }

    setErrorMessage('');
    setSuccessMessage(
      `${data.tokensAmount} tokens were successfully sent from '${data.senderWallet}' to '${data.receiverWallet}' wallet. Status of the transfer: '${response.data.state}'`
    );
  } catch (error) {
    console.error(error);
    setSuccessMessage('');
    const errorMessage =
      error.response?.data?.message ===
        'Cannot transfer to the same wallet as the originating one!'
        ? error.response.data.message
        : 'An error occurred while sending tokens.';
    setErrorMessage(errorMessage);
  } finally {
    setIsLoading(false);
  }
};

export const handleSendToUntrustedWallets = async (data, authContext, callbacks) => {
  const { setIsLoading, setErrorMessage, setSuccessMessage, setSenderWalletTokens, refreshWalletData, senderWalletId } = callbacks;

  setIsLoading(true);

  try {
    const response = await apiClient
      .setAuthHeader(authContext.token)
      .post('/transfers', {
        bundle: { bundle_size: data.tokensAmount },
        sender_wallet: data.senderWallet,
        receiver_wallet: data.receiverWallet,
        claim: false,
      });

    console.log(
      'Tokens transfer to untrusted wallet completed. Response: ' + JSON.stringify(response)
    );

    if (senderWalletId && refreshWalletData) {
      await refreshWalletData(senderWalletId);
    } else {
      setSenderWalletTokens((prev) => prev - data.tokensAmount);
    }

    setErrorMessage('');
    setSuccessMessage(
      `${data.tokensAmount} tokens were successfully sent to untrusted wallet '${data.receiverWallet}'. ` +
      `Status: '${response.data.state}'. ` +
      `Note: This wallet is not trusted - please verify with the recipient.`
    );
  } catch (error) {
    console.error('Error sending to untrusted wallet:', error);
    setSuccessMessage('');

    let errorMessage = error.response?.data?.message || 'An error occurred while sending tokens to untrusted wallet.';

    if (error.response) {
      if (error.response.data?.message === 'Cannot transfer to the same wallet as the originating one!') {
        errorMessage = error.response.data.message;
      } else if (error.response.data?.message?.includes('invalid wallet address')) {
        errorMessage = 'Invalid wallet address format. Please check the receiver wallet address.';
      } else if (error.response.status === 403) {
        errorMessage = 'You are not authorized to send to this wallet.';
      }
    }

    setErrorMessage(errorMessage);
  } finally {
    setIsLoading(false);
  }
};