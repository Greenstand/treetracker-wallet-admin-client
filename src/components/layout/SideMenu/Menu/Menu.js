import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  MenuItem,
  Grid,
  ListItemIcon,
  ListItemText,
  Drawer,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import IconLogo from "../../../UI/IconLogo";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/system";

export const MENU_WIDTH = 232;
export const MENU_WIDTH_COLLAPSED = 55;

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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
  color: theme.palette.primary.main,
}));

const Menu = (props) => {
  const iconsOnly = props.iconsOnly;
  const MenuContainer = styled("div")(() => ({
    width: iconsOnly ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
  }));

  const menu = (
    <>
      <LinkItemText to="/" end>
        <StyledMenuItem>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item>
              <StyledListItemIcon>
                <HomeIcon />
              </StyledListItemIcon>
            </Grid>
            {!iconsOnly && (
              <Grid item>
                <StyledListItemText primary="Home" />
              </Grid>
            )}
          </Grid>
        </StyledMenuItem>
      </LinkItemText>
      <LinkItemText to="/page1" end>
        <StyledMenuItem>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item>
              <StyledListItemIcon>
                <HomeIcon />
              </StyledListItemIcon>
            </Grid>
            {!iconsOnly && (
              <Grid item>
                <StyledListItemText primary="Page 1" />
              </Grid>
            )}
          </Grid>
        </StyledMenuItem>
      </LinkItemText>
    </>
  );

  return <MenuContainer>{menu}</MenuContainer>;
};

export default Menu;
