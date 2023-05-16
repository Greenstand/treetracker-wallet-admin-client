import React, { useEffect } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import {
  InnerCircle,
  InnerText,
  SquareBox,
  SquareBoxTitle,
} from "./WalletStyled";

const Wallet = () => {
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_WALLET_API_ROOT}/wallets/9d6c674f-ae62-4fab-8d14-ae5de9f14ab8`,
        {
          headers: {
            // TODO: replace with token from login when implemented
            "TREETRACKER-API-KEY": "FORTESTFORTESTFORTESTFORTESTFORTEST",
            Authorization:
              "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkNmM2NzRmLWFlNjItNGZhYi04ZDE0LWFlNWRlOWYxNGFiOCIsIm5hbWUiOiJ0ZXN0dXNlciIsInBhc3N3b3JkIjoiMWM4ZTQzMjQ2MjY0OGQ4MjVhZGU0OTgzZGE0YjFjOWNjMjMxMTgwZDNkZDBlNzdiMGNmZTBiMjhjNWUyZjJiMzlhYTNhZGFiZmNkNWUxZmU5NjhiOWU4MTUwMDVjZjY3NDk5YzMwMTc3ZjRjMDE5OWUzOTA2NGNlYWE1YWRlZmEiLCJzYWx0Ijoic2FsdCIsImxvZ29fdXJsIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyMy0wNS0wOVQwNjo0NzoxOC4zMzhaIiwiaWF0IjoxNjgzNjQyMDM1LCJleHAiOjE3MTUxNzgwMzUsImlzcyI6ImdyZWVuc3RhbmQifQ.pn8OjlBWyvCUh1adL39mRXE49xDbOoE2gYuMvro7qo6Fklp642FQhVoRbvtct_aK5gQPivU3YASTsx9mXTfvncoem7Sbq8HTkIicM69rx2GaaOrT3s07dM-fTsB6s6XarIBGxa7vzfWUrMOAwZ2wgxJgbZlXT6krVAC_kaPXvPmYkmxJSTgYLDJe6t_Iv4PCiUL4kQEB4IwQPLD2KrheacFX25B_6fCgNrPTFFC5A4it3KSUI-R4hKJDCq2fnLHBCZyDTkcXe3zJUsztu0JRQ3gxN9IfkMepqxYslUbFnRJr878r6c6juIX737H6bKQDFMW6Lo4ePOj5x2eyJYn0FNvhvPHqtoKYsD7-VYJYp3K0A4wK7h56gc8TA5SqROWKeEOtNREYRENZOzid3TDm6W1xL3na5Gx43m4cRBm5uV3jpQbogH7uP9bQ1svfvwCb8gxImDqnwyfx4PpjRJet6KCXgwwGJYKkstswDYBWuzocFJ18Vn5yCPlyg0LRXKWlvT3iSByjRVgDSbwuH39pDQJc0SDNe1HJSqHGENhMaCfGtizE5LhmBXMRV3oICCaqmLU217NApuTMBIrJWOkLwR-3gIlQLxbPTNthoTh_eCn0p7HW8n5j_8-yv_d1U-1bSuR8HCfCHVFo7BoQEPs--YsKTWX3KvEdgbJGOdhcLxM",
          },
        }
      )
      .then((response) => {
        debugger;
        const data = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
          <SquareBox className="box" elevation={3}>
            <SquareBoxTitle variant="h6">Wallet</SquareBoxTitle>
            <InnerCircle>
              <InnerText>123</InnerText>
            </InnerCircle>
          </SquareBox>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Wallet;
