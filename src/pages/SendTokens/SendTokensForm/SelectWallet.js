import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { getWallets } from '../../../api/wallets';
import AuthContext from '../../../store/auth-context';

function SelectWallet({
  wallet,
  onChangeWallet,
  label,
  createdWalletName,
  isError,
  errorMessage,
  walletType = 'managed',
  trustedWallets = [],
  walletScope,
  includeCurrentWallet = false,
}) {
  const filterLoadMore = 'LOAD_MORE';

  const [walletPage, setWalletPage] = useState(0);
  const [walletsLoadedData, setWalletsLoadedData] = useState([]);
  // not only wallet names, but other info as well
  const [walletsFullLoadedData, setWalletsFullLoadedData] = useState([]);
  const [walletSearchString, setWalletSearchString] = useState('');

  const authContext = useContext(AuthContext);

  // Is called when page loads and when user starts to type in a 'Wallet' filter
  useEffect(() => {
    const getWalletsData = async () => {
      setWalletPage(0);
      
      if (walletType === 'trusted') {
        const wallets = trustedWallets
          .filter((wallet) =>
            wallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase())
          );

        const walletNames = wallets.map(wallet => wallet.name);
        walletNames.sort();
        setWalletsFullLoadedData(wallets);
        setWalletsLoadedData(walletNames);
        return;
      }

      try {
        const response = await getWallets(
          authContext.token,
          walletSearchString,
          undefined,
          undefined,
          {
            scope: walletScope,
          }
        );
        if (!response) {
          console.log('No response from getWallets');
          return;
        }

        const total = response.total;
        setWalletsFullLoadedData(response.wallets);

        // filter wallets to remove the current wallet witch API always returns
        let wallets = response.wallets
          .filter((wallet) =>
            wallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase())
          );

        if (includeCurrentWallet) {
          const currentWallet = JSON.parse(localStorage.getItem('wallet') || '{}');
          const matchesSearch =
            currentWallet?.name &&
            currentWallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase());
          const alreadyIncluded = wallets.some(
            (walletItem) => walletItem.name === currentWallet.name
          );
          if (matchesSearch && !alreadyIncluded) {
            wallets = [
              {
                id: currentWallet.id,
                name: currentWallet.name,
                logoURL: currentWallet.logoURL,
                about: currentWallet.about,
                displayName: currentWallet.displayName,
                created_at: currentWallet.createdAt,
                tokensInWallet: 0,
              },
              ...wallets,
            ];
          }
        }

        const walletNames = wallets.map((wallet) => wallet.name);

        // remove when API returns sorted data
        walletNames.sort();

        const addLoadMoreButton = response.wallets.length < total && !includeCurrentWallet;

        setWalletsFullLoadedData(wallets);
        addLoadMoreButtonToWallets([...walletNames], addLoadMoreButton);
      } catch (error) {
        console.error(error);
      }
    };

    getWalletsData();
  }, [walletSearchString, walletType, trustedWallets, walletScope, includeCurrentWallet]);

  useEffect(() => {
    // If createdWalletName is not null, get wallets again by createdWalletName and set it as selected value
    const getWalletsData = async () => {
      if (!createdWalletName) return;

      setWalletSearchString(createdWalletName);
      onChangeWallet(createdWalletName);
    };

    getWalletsData();
  }, [createdWalletName]);

  // Is called when user click 'Load More' button in Wallet autocomplete
  useEffect(() => {
    const getWalletsData = async () => {
      if (walletPage === 0 || walletType === 'trusted') {
        return;
      }

      try {
        const response = await getWallets(
          authContext.token,
          walletSearchString,
          {
            pagination: {
              offset: walletPage * 10,
              limit: 10,
            },
          },
          undefined,
          {
            scope: walletScope,
          }
        );

        const total = response.total;
        let walletsFullData = response.wallets;
        // filter wallets to remove the current wallet witch API always returns
        let wallets = response.wallets
          .filter((wallet) =>
            wallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase())
          );

        if (includeCurrentWallet) {
          const currentWallet = JSON.parse(localStorage.getItem('wallet') || '{}');
          const alreadyIncluded = wallets.some(
            (walletItem) => walletItem.name === currentWallet.name
          );
          if (currentWallet?.name && !alreadyIncluded) {
            const currentWalletOption = {
              id: currentWallet.id,
              name: currentWallet.name,
              logoURL: currentWallet.logoURL,
              about: currentWallet.about,
              displayName: currentWallet.displayName,
              created_at: currentWallet.createdAt,
              tokensInWallet: 0,
            };
            wallets = [currentWalletOption, ...wallets];
            walletsFullData = [currentWalletOption, ...walletsFullData];
          }
        }

        setWalletsFullLoadedData(walletsFullData);
        const walletNames = wallets.map((wallet) => wallet.name);

        // remove when API returns sorted data
        walletNames.sort();

        const addLoadMoreButton =
          response.wallets.length + walletsLoadedData.length < total &&
          !includeCurrentWallet;

        addLoadMoreButtonToWallets(
          [...walletsLoadedData, ...walletNames],
          addLoadMoreButton
        );
      } catch (error) {
        console.error(error);
      }
    };

    getWalletsData();
  }, [walletPage, walletType, walletScope, includeCurrentWallet]);

  const addLoadMoreButtonToWallets = (data, addMoreData) => {
    const dataToShow = data;
    if (addMoreData) {
      dataToShow.push(filterLoadMore);
    }

    setWalletsLoadedData(dataToShow);
  };

  const handleLoadMoreWallets = async (event) => {
    event.stopPropagation();
    setWalletPage(walletPage + 1);

    // 'Load more' button should be removed from the list of options
    walletsLoadedData.pop();
    setWalletsLoadedData([...walletsLoadedData]);
  };

  return (
    <>
      <Autocomplete
        data-testid="wallet-dropdown"
        label="wallet"
        htmlFor="wallet"
        id="wallet"
        sx={{ maxWidth: '30rem', minWidth: '15rem' }}
        options={walletType === 'trusted' ? trustedWallets : [...walletsLoadedData]}
        value={wallet ? (walletType === 'trusted' ? trustedWallets.find(w => w.name === wallet) : wallet) : null}
        getOptionLabel={(option) => {
          if (!option) return '';
          if (option === filterLoadMore) {
            return walletSearchString;
          }
          if (walletType === 'trusted') {
            return option?.name || '';
          }
          return option || '';
        }}
        loading={walletsLoadedData.length === 1}
        loadingText={'Loading..'}
        onChange={(_oldVal, newVal) => {
          // event is triggered by onInputChange
          if (newVal === filterLoadMore) return;

          if (walletType === 'trusted') {
            onChangeWallet(newVal); // newVal is already the wallet object
          } else {
            const walletData = walletsFullLoadedData.find(
              (wallet) => wallet.name === newVal
            );
            onChangeWallet(walletData);
          }
        }}
        onInputChange={(event, newVal) => {
          // Do not select 'LOAD_MORE' as an autocomplete value
          if (newVal === filterLoadMore) {
            setWalletSearchString(walletSearchString);
            return;
          }
          setWalletSearchString(newVal);
        }}
        renderInput={(params) => {
          return (
            <TextField
              error={isError}
              helperText={errorMessage}
              {...params}
              label={label}
            />
          );
        }}
        renderOption={(props, option) => {
          if (option === filterLoadMore) {
            return (
              <li {...props}>
                <Button
                  id="loadMore_btn"
                  onClick={handleLoadMoreWallets}
                  color="primary"
                >
                  Load more
                </Button>
              </li>
            );
          }
          return <li {...props}>{walletType === 'trusted' ? option.name : option}</li>;
        }}
      />
    </>
  );
}

export default React.memo(SelectWallet);
