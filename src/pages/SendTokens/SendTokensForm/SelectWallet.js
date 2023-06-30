import React, { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";

function SelectWallet({ wallet, handleChangeWallet }) {
  const filterLoadMore = "LOAD_MORE";
  const [walletPage, setWalletPage] = useState(0);
  const [walletsLoadedData, setWalletsLoadedData] = useState([]);
  const [walletSearchString, setWalletSearchString] = useState("");

  // Is called when page loads and when user starts to type in a 'Wallet' filter
  useEffect(() => {
    const getWallets = async () => {
      setWalletPage(0);

      const response = {
        total: 2,
        wallets: ["Wallet 1", "Wallet 2"],
      }; // await growerContext.getWallets(walletSearchString);

      if (!response) {
        console.log("No response from getWallets");
        return;
      }

      const total = response.total;
      const wallets = response.wallets;
      const addLoadMoreButton = wallets.length < total;

      addLoadMoreButtonToWallets([...wallets], addLoadMoreButton);
    };

    getWallets();
  }, [walletSearchString]);

  // Is called when user click 'Load More' button in Wallet autocomplete
  useEffect(() => {
    const getWallets = async () => {
      if (walletPage === 0) {
        return;
      }

      const response = {
        total: 2,
        wallets: ["Wallet 1", "Wallet 2"],
      };

      //   const response = await growerContext.getWallets(
      //     walletSearchString,
      //     walletPage
      //   );

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

  // autocompleteInputRoot: {
  //   padding: `${theme.spacing(0, 12, 0, 1)} !important`,
  // },

  return (
    <Autocomplete
      data-testid="wallet-dropdown"
      label="wallet"
      htmlFor="wallet"
      id="wallet"
      //   classes={{
      //     inputRoot: classes.autocompleteInputRoot,
      //   }}
      sx={{ width: 300 }}
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
      loadingText={"Loading.."}
      onChange={(_oldVal, newVal) => {
        // event is triggered by onInputChange
        if (newVal === filterLoadMore) return;

        handleChangeWallet(newVal);
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
        return <TextField {...params} label="Select Wallet" />;
      }}
      renderOption={handleWalletRenderOption}
    />
  );
}

export default SelectWallet;
