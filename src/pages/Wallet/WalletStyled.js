import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";

export const LoaderGrid = styled(Grid)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const ContentContainer = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "calc(100% - 10vh)",
  "@media (max-width: 480px)": {
    height: "100%",
  },
  maxWidth: "false",
});

export const ContentGrid = styled(Grid)({
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
});
