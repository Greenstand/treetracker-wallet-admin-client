import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { styled } from "@mui/system";

import Menu from "./Menu/Menu";
import IconLogo from "../../UI/IconLogo";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: "calc(15px - 2vw)",
}));

const SideMenu = (props) => {
  const [isMenuShown, setMenuShown] = useState(true);
  const iconsOnly = props.isMenuCollapsed;

  function handleMenuClick() {
    props.onMenuToggle(!iconsOnly);
  }

  return (
    <>
      <Grid container direction="column" justifyContent="space-between">
        <Grid item>
          <IconButton title="menu" onClick={() => handleMenuClick()}>
            <MenuIcon />
          </IconButton>
          {!iconsOnly && <IconLogo />}
        </Grid>
        <Grid item>{props.children}</Grid>
      </Grid>
      <StyledToolbar />
      {isMenuShown && (
        <Menu onClose={() => setMenuShown(true)} iconsOnly={iconsOnly} />
      )}
    </>
  );
};

export default SideMenu;
