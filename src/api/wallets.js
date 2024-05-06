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
  { pagination } = { pagination: { offset: 0, limit: 10 } },
  { sorting } = { sorting: { sortBy: 'created_at', order: 'desc' } }
) => {
  const { total, wallets } = await apiClient
    .setAuthHeader(token)
    .get('/wallets', {
      params: {
        name: name || undefined, // Pass 'name' if it exists, or pass 'undefined' to exclude it
        offset: pagination.offset,
        limit: pagination.limit,
        sort_by: sorting.sortBy,
        order: sorting.order,
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

export const createWallet = async (token, walletName) => {
  const postRequest = {
    wallet: walletName,
  };

  const createdWallet = await apiClient
    .setAuthHeader(token)
    .post('/wallets', postRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw Error(error.response.data.message);
    });

  return createdWallet;
};

export const updateWallet = async (token, wallet) => {
  const patchRequest = {
    about: wallet.about,
    cover_image: wallet.coverImage,
    logo_image: wallet.logoImage,
  };

  const updatedWallet = await apiClient
    .setAuthHeader(token)
    .addContentType('multipart/form-data')
    .patch('/wallets/' + wallet.id, patchRequest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      throw Error(error.response.data.message);
    });

  return updatedWallet;
};
