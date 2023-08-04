import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export const StyledTypography = styled(Typography)(() => ({
  color: "white",
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));
