import styled from "@emotion/styled";
import { Container, Grid } from "@mui/material";

export const ContentContainer = styled(Container)({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "auto",
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
