import { CircularProgress } from "@mui/material";
import { LoaderGrid } from "./LoaderStyled";

export const Loader = () => {
  return (
    <LoaderGrid>
      <CircularProgress />
    </LoaderGrid>
  );
};
