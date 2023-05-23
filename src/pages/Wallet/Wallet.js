import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Grid } from "@mui/material";
import WalletInfoBlock from "./WalletInfoBlock/WalletInfoBlock";
import apiClient from "../../utils/apiClient";

const mapWallet = (walletData) => {
  return {
    id: walletData.id,
    logoURL: walletData.logo_url,
    tokensInWallet: walletData.tokens_in_wallet,
    name: walletData.wallet,
  };
};

const Wallet = () => {
  const [loading, setLoading] = useState(true);

  const defaultWallet = {
    id: "",
    logoURL: "",
    tokensInWallet: 0,
    name: "",
  };

  const [wallet, setWallet] = useState(defaultWallet);

  useEffect(() => {
    setLoading(true);

    // TODO: get wallet id by decoding the token. We get the token after login, which is not implemented yet.
    apiClient
      .get("/wallets/9d6c674f-ae62-4fab-8d14-ae5de9f14ab8")
      .then((response) => {
        const wallet = mapWallet(response.data);
        setWallet(wallet);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Grid
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Grid
      sx={{
        width: "100%",
      }}
    >
      <div>
        <header style={{ height: "10vh" }}>Wallet</header>
      </div>
      <Container
        maxWidth="false"
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          height: "calc(100% - 10vh)",
          "@media (max-width: 480px)": {
            height: "100%",
          },
        }}
      >
        <Grid
          sx={{
            display: "grid",
            // update when more blocks are added
            gridTemplateColumns: "repeat(1, 20rem)",
            gridTemplateRows: "repeat(1, 20rem)",
            gridGap: "2rem",
            color: "#444",
            "@media (max-width: 768px)": {
              gridTemplateColumns: "repeat(2, 20rem)",
              gridTemplateRows: "repeat(1, 20rem)",
            },
            "@media (max-width: 480px)": {
              gridTemplateColumns: "repeat(1, 20rem)",
              gridTemplateRows: "repeat(1, 20rem)",
            },
          }}
        >
          <WalletInfoBlock
            title={`Wallet ${wallet.name}`}
            innerNumber={wallet.tokensInWallet}
            innerText="tokens"
          />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Wallet;
