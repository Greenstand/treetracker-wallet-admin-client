import apiClient from "../../../utils/apiClient";


export const handleCreateWallet = async (name, authContext, callbacks) => {
  const { setIsLoading, setErrorMessage, setSuccessMessage, setCreatedWalletName } = callbacks;

  if (!name) return;

  setIsLoading(true);

  try {
    await apiClient
      .setAuthHeader(authContext.token)
      .post('/wallets', {
        wallet: name,
      });

    setErrorMessage('');
    setSuccessMessage(`Wallet ${name} created successfully!`);
    setCreatedWalletName(name);
  } catch (error) {
    console.error(error);
    setSuccessMessage('');
    const errorMessage =
      error.response?.status === 403 &&
      error.response?.data?.message?.includes('already exists')
        ? 'Wallet with this name already exists.'
        : 'An error occurred while creating a wallet.';
    setErrorMessage(errorMessage);
  } finally {
    setIsLoading(false);
  }
};