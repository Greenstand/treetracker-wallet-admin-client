/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, { useContext, useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';
import WalletContext from '../../../store/wallet-context';
import apiClient from '../../../utils/apiClient';

function SelectWallet({
  wallet,
  handleChangeWallet,
  label,
  createdWalletName,
  // walletSearchString,
  // handleChangeWalletSearchString,
}) {
  const filterLoadMore = 'LOAD_MORE';
  const walletContext = useContext(WalletContext);

  const [walletPage, setWalletPage] = useState(0);
  const [walletsLoadedData, setWalletsLoadedData] = useState([]);
  const [walletSearchString, setWalletSearchString] = useState('');

  useEffect(() => {
    console.log('SelectWallet.js rendered' + wallet);
    debugger;
  }, []);

  // Is called when page loads and when user starts to type in a 'Wallet' filter
  useEffect(() => {
    // TODO: if createdWalletName is not null, get wallets again by createdWalletName and set it as selected
    const getWallets = async () => {
      setWalletPage(0);

      let response = await walletContext.getWallets(walletSearchString);

      if (!response) {
        console.log('No response from getWallets');
        return;
      }

      const total = response.total;
      const wallets = response.wallets.map((wallet) => wallet.name);
      const addLoadMoreButton = wallets.length < total;

      addLoadMoreButtonToWallets([...wallets], addLoadMoreButton);
    };

    getWallets();
  }, [walletSearchString]);

  useEffect(() => {
    // If createdWalletName is not null, get wallets again by createdWalletName and set it as selected value
    const getWallets = async () => {
      if (!createdWalletName) return;

      // walletSearchString = createdWalletName;
      setWalletSearchString(createdWalletName);
      handleChangeWallet(createdWalletName);
    };

    getWallets();
  }, [createdWalletName]);

  // Is called when user click 'Load More' button in Wallet autocomplete
  useEffect(() => {
    const getWallets = async () => {
      if (walletPage === 0) {
        return;
      }

      const response = await walletContext.getWallets(
        walletSearchString,
        walletPage
      );

      const total = response.total;
      const wallets = response.wallets;
      const addLoadMoreButton =
        wallets.length + walletsLoadedData.length < total;

      addLoadMoreButtonToWallets(
        [...walletsLoadedData, ...wallets],
        addLoadMoreButton
      );
    };

    getWallets();
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

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

  // autocompleteInputRoot: {
  //   padding: `${theme.spacing(0, 12, 0, 1)} !important`,
  // },

  return (
    <>
      createdWalletName 2: {createdWalletName}
      <Autocomplete
        data-testid="wallet-dropdown"
        label="wallet"
        htmlFor="wallet"
        id="wallet"
        //   classes={{
        //     inputRoot: classes.autocompleteInputRoot,
        //   }}
        sx={{ width: '100%' }}
        options={[...walletsLoadedData]}
        value={wallet}
        // todo: select current wallet?
        // defaultValue={filterOptionSelect}
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

          handleChangeWallet(newVal);
        }}
        onInputChange={(event, newVal) => {
          //   // Do not select 'LOAD_MORE' as an autocomplete value
          //   if (newVal === filterLoadMore) {
          //     handleChangeWalletSearchString(walletSearchString);
          //     return;
          //   }
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
