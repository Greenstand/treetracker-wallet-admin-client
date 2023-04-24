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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import IconLogo from "../../../UI/IconLogo";
import HomeIcon from "@material-ui/icons/Home";

export const MENU_WIDTH = 232;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: MENU_WIDTH,
    position: "inherit",
    height: "100vh",
  },
  menuContainer: {
    width: MENU_WIDTH,
  },
  menuTitle: {
    letterSpacing: ".05em",
    fontVariantCaps: "all-small-caps",
    fontSize: "16px",
    fontWeight: "500",
  },
  menuItemWithChildren: {
    padding: theme.spacing(0, 0, 0, 4),
  },
  menuItem: {
    minHeight: 0,
    "&:hover": {
      backgroundColor: theme.palette.primary.lightVery,
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
  },
  listItemIcon: {
    minWidth: 46,
  },
  listItemText: {
    "& .MuiTypography-body1": {
      fontWeight: 700,
    },
  },
  linkItemText: {
    textDecoration: "none",
    color: theme.palette.primary.main,
  },
}));

const Menu = () => {
  const classes = useStyles();

  // const classes = {
  //   active: "active",
  // };

  const menu = (
    <>
      {/* <Box p={4}>
        <IconLogo />
      </Box>
      <Box height={20} /> */}
      <NavLink
        to="/"
        // className={({ isActive }) => (isActive ? classes.active : undefined)}
        className={classes.linkItemText}
        end
      >
        <MenuItem className={classes.menuItem} selected={true}>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item>
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText className={classes.listItemText}>Home</ListItemText>
            </Grid>
          </Grid>
        </MenuItem>
      </NavLink>
      <NavLink
        to="/page1"
        // className={({ isActive }) => (isActive ? classes.active : undefined)}
        className={({ isActive }) => (isActive ? classes.active : undefined)}
        end
      >
        <MenuItem className={classes.menuItem} selected={true}>
          <Grid container direction="row" alignItems="flex-end">
            <Grid item>
              <ListItemIcon className={classes.listItemIcon}>
                <HomeIcon />
              </ListItemIcon>
            </Grid>
            <Grid item>
              <ListItemText className={classes.listItemText}>
                Page 1
              </ListItemText>
            </Grid>
          </Grid>
        </MenuItem>
      </NavLink>
    </>
  );

  return <div className={classes.menuContainer}>{menu}</div>;
};

export default Menu;
