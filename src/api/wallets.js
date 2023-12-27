import apiClient from '../utils/apiClient';

// different API endpoints return different property for the 'name' field
const mapWallet = (walletData, nameProp) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData[nameProp],
    about: walletData.about,
    //createdDate: walletData.created_at,
    created_at: walletData.created_at,
  };
};

export const getWallets = async (
  token,
  name = '',
  //pageNumber = 1,
  { pagination }
) => {
  // const params = {
  //   offset: pagination.offset, // pageNumber - 1,
  // };

  // if (name) {
  //   params.name = name;
  // }

  const { total, wallets } = await apiClient
    .setAuthHeader(token)
    .get('/wallets', {
      params: {
        name: name || undefined, // Pass 'name' if it exists, or pass 'undefined' to exclude it
        offset: pagination.offset, // pageNumber - 1,
        limit: pagination.limit,
      },
    })
    .then((response) => {
      const wallets = response.data.wallets.map((wallet) =>
        mapWallet(wallet, 'name')
      );
      return {
        total: response.data.total,
        wallets,
      };
    })
    .catch((error) => {
      console.error(error);
      throw Error('An error occurred while fetching wallets data.');
    });

  return {
    total,
    wallets,
  };
};

export const getWalletById = async (token, id) => {
  const walletData = await apiClient
    .setAuthHeader(token)
    .get('/wallets/' + id)
    .then((response) => {
      return mapWallet(response.data, 'wallet');
    })
    .catch((error) => {
      console.error(error);
      throw Error('An error occurred while fetching wallets data.');
    });

  return walletData;
};
