/* eslint-disable no-unused-vars */
import React from "react";
import { Grid, InputLabel, Paper } from "@mui/material";
import { ContentContainer, ContentGrid } from "./SendTokensStyled";
import PageHeader from "../../components/layout/PageHeader/PageHeader";
import SendTokensForm from "./SendTokensForm/SendTokensForm";

const SendTokens = () => {
  return (
    <Grid style={{ width: "100%" }}>
      <PageHeader title="Send tokens" />
      <ContentContainer>
        {/* <ContentGrid> */}
        <Paper
          className="box"
          elevation={3}
          style={{ width: "60rem", height: "60vh" }}
        >
          <SendTokensForm />
        </Paper>
        {/* </ContentGrid> */}
      </ContentContainer>
    </Grid>
  );
};

export default SendTokens;
