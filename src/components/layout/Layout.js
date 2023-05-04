import React, { useState } from "react";
import SideMenu from "./SideMenu/SideMenu";
import { styled } from "@mui/system";
import { Box, Drawer, Grid, Paper } from "@mui/material";
import { MENU_WIDTH, MENU_WIDTH_COLLAPSED } from "./SideMenu/Menu/Menu";
import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const StyledRoot = styled("div")(({ theme }) => ({
    display: "flex",
  }));

  const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
    flexShrink: 0,
  }));

  const StyledDrawerPaper = styled(Paper)(({ theme }) => ({
    width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
  }));

  const StyledContent = styled(Grid)(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: "rgb(239, 239, 239)",
    height: "100vh",
  }));

  const menuToggleHandler = () => {
    setMenuCollapsed((value) => !value);
  };

  return (
    <StyledRoot>
      <StyledDrawer variant="permanent" open={true}>
        <StyledDrawerPaper>
          <SideMenu
            onMenuToggle={menuToggleHandler}
            isMenuCollapsed={menuCollapsed}
          />
        </StyledDrawerPaper>
      </StyledDrawer>
      <StyledContent container>{children}</StyledContent>
    </StyledRoot>
  );
};

export default Layout;
