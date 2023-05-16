import React from "react";
import { Grid } from "@mui/material";
import {
  StyledListItemText,
  LinkItemText,
  StyledListItemIcon,
  StyledMenuItem,
} from "./MenuItemStyled";

const MenuItem = ({ icon, linkTo, iconsOnly, text }) => {
  return (
    <LinkItemText
      to={linkTo}
      end
      className={({ isActive }) => (isActive ? "active" : "")}
    >
      <StyledMenuItem>
        <Grid container direction="row" alignItems="flex-end">
          <Grid item>
            <StyledListItemIcon>{icon}</StyledListItemIcon>
          </Grid>
          {!iconsOnly && (
            <Grid item>
              <StyledListItemText primary={text} />
            </Grid>
          )}
        </Grid>
      </StyledMenuItem>
    </LinkItemText>
  );
};

export default MenuItem;
