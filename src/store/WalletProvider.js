import React, { useState } from 'react';
import WalletContext from './wallet-context';
import apiClient from '../utils/apiClient';

const mapWallet = (walletData) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData.name,
  };
};

const WalletProvider = (props) => {
  // todo: remove mock
  // eslint-disable-next-line no-unused-vars
  const [currentWallet, setCurrentWallet] = useState({
    id: '',
    logo_url: '',
    tokens_in_wallet: 0,
    name: '',
  }); //useState(null);

  const getWallets = async (name = '', pageNumber = 1) => {
    const params = {
      offset: pageNumber - 1,
    };

    if (name) {
      params.name = name;
    }

    const { total, wallets } = await apiClient
      .get('/wallets', {
        params: {
          name: name || undefined, // Pass 'name' if it exists, or pass 'undefined' to exclude it
          offset: pageNumber - 1,
        },
      })
      .then((response) => {
        const wallets = response.data.wallets.map((wallet) =>
          mapWallet(wallet)
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

  const value = {
    currentWallet,
    getWallets,
  };

  return (
    <WalletContext.Provider value={value}>
      {props.children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
