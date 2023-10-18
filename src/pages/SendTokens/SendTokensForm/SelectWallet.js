import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import { getWallets } from '../../../api/wallets';
import AuthContext from '../../../store/auth-context';

function SelectWallet({ wallet, onChangeWallet, label, createdWalletName }) {
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
      try {
        let response = await getWallets(authContext.token, walletSearchString);

        if (!response) {
          console.log('No response from getWallets');
          return;
        }

        const total = response.total;
        setWalletsFullLoadedData(response.wallets);

        // filter wallets to remove the current wallet witch API always returns
        const wallets = response.wallets
          .filter((wallet) =>
            wallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase())
          )
          .map((wallet) => wallet.name);

        // remove when API returns sorted data
        wallets.sort();

        const addLoadMoreButton = response.wallets.length < total;

        addLoadMoreButtonToWallets([...wallets], addLoadMoreButton);
      } catch (error) {
        console.error(error);
      }
    };

    getWalletsData();
  }, [walletSearchString]);

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
      if (walletPage === 0) {
        return;
      }

      try {
        const response = await getWallets(
          authContext.token,
          walletSearchString,
          walletPage
        );

        const total = response.total;
        setWalletsFullLoadedData(response.wallets);
        // filter wallets to remove the current wallet witch API always returns
        const wallets = response.wallets
          .filter((wallet) =>
            wallet.name
              .toLowerCase()
              .includes(walletSearchString.toLocaleLowerCase())
          )
          .map((wallet) => wallet.name);

        // remove when API returns sorted data
        wallets.sort();

        const addLoadMoreButton =
          response.wallets.length + walletsLoadedData.length < total;

        addLoadMoreButtonToWallets(
          [...walletsLoadedData, ...wallets],
          addLoadMoreButton
        );
      } catch (error) {
        console.error(error);
      }
    };

    getWalletsData();
  }, [walletPage]);

  const addLoadMoreButtonToWallets = (data, addMoreData) => {
    const dataToShow = data;
    if (addMoreData) {
      dataToShow.push(filterLoadMore);
    }

    setWalletsLoadedData(dataToShow);
  };

  const handleWalletRenderOption = (props, option) => {
    if (!option) return;

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

    return <li {...props}>{option}</li>;
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
        options={[...walletsLoadedData]}
        value={wallet}
        getOptionLabel={(wallet) => {
          if (wallet === filterLoadMore) {
            return walletSearchString;
          }

          return wallet;
        }}
        loading={walletsLoadedData.length === 1}
        loadingText={'Loading..'}
        onChange={(_oldVal, newVal) => {
          // event is triggered by onInputChange
          if (newVal === filterLoadMore) return;

          const walletData = walletsFullLoadedData.find(
            (wallet) => wallet.name === newVal
          );

          onChangeWallet(walletData);
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
          return <TextField {...params} label={label} />;
        }}
        renderOption={handleWalletRenderOption}
      />
    </>
  );
}

export default React.memo(SelectWallet);