import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import ErrorMessage from "../../components/UI/components/ErrorMessage/ErrorMessage";
import { Loader } from "../../components/UI/components/Loader/Loader";
import apiClient from "../../utils/apiClient";
import WalletHeader from "./WalletHeader/WalletHeader";
import WalletInfoBlock from "./WalletInfoBlock/WalletInfoBlock";
import { ContentContainer, ContentGrid } from "./WalletStyled";

const mapWallet = (walletData) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData.wallet,
  };
};

const Wallet = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const defaultWallet = {
    id: "",
    logoURL: "",
    tokensInWallet: 0,
    name: "",
  };

  const [wallet, setWallet] = useState(defaultWallet);
  const [pendingTransfers, setPendingTransfers] = useState(0);

  useEffect(() => {
    setIsLoading(true);

    // TODO: get wallet id by decoding the token. We get the token after login, which is not implemented yet.
    apiClient
      .get("/wallets/e63bde5b-49b0-431a-91c7-33f257206fb4")
      .then((response) => {
        const wallet = mapWallet(response.data);
        setWallet(wallet);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while fetching wallet data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);

    // TODO: get wallet id by decoding the token. We get the token after login, which is not implemented yet.
    apiClient
      .get("/transfers?state=pending")
      .then((response) => {
        setPendingTransfers(response.data.transfers.length);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("An error occurred while fetching wallet data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid>
      <WalletHeader
        title={wallet.name}
        pendingTransfers={pendingTransfers}
        logoURL={wallet.logoURL}
      />
      {errorMessage && (
        <ErrorMessage
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}
      <ContentContainer>
        <ContentGrid>
          <WalletInfoBlock
            title={`Wallet ${wallet.name}`}
            innerNumber={wallet.tokensInWallet}
            innerText="tokens"
          />
        </ContentGrid>
      </ContentContainer>
    </Grid>
  );
};

export default Wallet;
