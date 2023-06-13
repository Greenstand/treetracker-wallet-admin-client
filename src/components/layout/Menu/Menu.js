import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import IconLogo from "../../UI/IconLogo";
import MenuItem from "./MenuItem/MenuItem";
import {
  AppBarStyled,
  DrawerHeaderStyled,
  DrawerStyled,
  LogoStyled,
} from "./MenuStyled";
import AuthContext from "../../../store/auth-context";

const Menu = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const theme = useTheme();

  const authContext = React.useContext(AuthContext);

  const logoutHandler = () => authContext.logout();

  return (
    <>
      {/* TODO: Move to top menu component */}
      <AppBarStyled position="fixed" open={open}>
        {/* TODO: Move styles */}
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <LogoStyled variant="h6" noWrap component="div">
              <IconLogo />
            </LogoStyled>
          </div>
          <div>
            <LogoutIcon
              color="inherit"
              style={{ cursor: "pointer" }}
              onClick={logoutHandler}
            ></LogoutIcon>
          </div>
        </Toolbar>
      </AppBarStyled>
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeaderStyled>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeaderStyled>
        <MenuItem open={open} />
      </DrawerStyled>
    </>
  );
};

export default Menu;
