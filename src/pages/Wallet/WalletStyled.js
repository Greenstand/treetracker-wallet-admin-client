import styled from "@emotion/styled";
import { Paper, Typography } from "@mui/material";

export const SquareBox = styled(Paper)({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SquareBoxTitle = styled(Typography)({
  position: "absolute",
  top: "1rem",
  left: "1rem",
});

export const InnerCircle = styled("div")({
  width: "13rem",
  height: "13rem",
  backgroundColor: "green",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const InnerText = styled(Typography)({
  fontSize: 48,
  fontWeight: "bold",
  color: "#FFF",
});
