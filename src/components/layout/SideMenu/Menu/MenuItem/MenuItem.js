import React from "react";
import {
  MenuItem as MuiMenuItem,
  Grid,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/system";

const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  minHeight: 0,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
      color: theme.palette.primary.main,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  borderTopRightRadius: 25,
  borderBottomRightRadius: 25,
  marginRight: theme.spacing(4),
  "&.Mui-selected": {
    color: theme.palette.primary.main,
    fontWeight: 400,
    backgroundColor: theme.palette.action.hover,
  },
  "&.Mui-selected .MuiListItemIcon-root": {
    color: theme.palette.primary.main,
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 46,
});

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-body1": {
    fontWeight: 700,
  },
}));

const LinkItemText = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.lightMain,
  fontWeight: "normal",
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const MenuItem = ({ icon, linkTo, iconsOnly, text }) => {
  return (
    <LinkItemText
      to={linkTo}
      end
      //   style={({ theme, isActive }) => {
      //     return {
      //       color: isActive ? theme.palette.primary.main : "",
      //     };
      //   }}
      className={({ theme, isActive }) => (isActive ? "active" : "")}
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
