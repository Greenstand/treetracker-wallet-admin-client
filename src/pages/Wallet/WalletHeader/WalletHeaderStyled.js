import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";

export const InnerCircle = styled("div")({
  width: "7rem",
  height: "7rem",
  backgroundColor: "rgb(134, 194, 50)",
  borderRadius: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

export const InnerText = styled(Typography)({
  fontSize: 30,
  lineHeight: 1,
  fontWeight: "bold",
});

export const ContentContainer = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  gap: "2rem",
  height: "auto",
  maxWidth: "false",
  marginTop: "6rem",
});

export const TitleContainer = styled("div")({
  lineHeight: 1.8,
});

export const Title = styled("div")({
  fontSize: 34,
  fontWeight: 600,
  color: "#373A3E",
});

export const PendingTransfers = styled("div")({
  fontSize: 16,
  color: "red",
});
