import { createContext } from 'react';

const WalletContext = createContext({
  currentWallet: null,
  getWallets: () => {},
});

export default WalletContext;
