import React from "react";
import Paper from "@mui/material/Paper";
import { Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const SquareBox = styled(Paper)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const TextLabel = styled(Typography)({
  position: "absolute",
  top: "1rem",
  left: "1rem",
});

const GreenCircle = styled("div")({
  width: 150,
  height: 150,
  backgroundColor: "green",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const MockedNumber = styled(Typography)({
  fontSize: 48,
  fontWeight: "bold",
  color: "#FFF",
});

const Wallet = () => {
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
            <TextLabel variant="h6">Wallet</TextLabel>
            <GreenCircle>
              <MockedNumber>123</MockedNumber>
            </GreenCircle>
          </SquareBox>
        </Grid>
      </Container>
    </Grid>
  );
};

export default Wallet;
