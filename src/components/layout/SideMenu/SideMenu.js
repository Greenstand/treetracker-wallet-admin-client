import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Menu from "./Menu/Menu";
import IconLogo from "../../UI/IconLogo";
import { Box } from "@mui/material";

const SideMenu = (props) => {
  const [isMenuShown, setMenuShown] = useState(true);
  const iconsOnly = props.isMenuCollapsed;

  function handleMenuClick() {
    props.onMenuToggle(!iconsOnly);
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        spacing={5}
      >
        <Grid item>
          <Grid container direction="row" alignItems="center">
            <IconButton
              title="menu"
              onClick={() => handleMenuClick()}
              style={iconsOnly ? { width: "100%" } : {}}
            >
              <MenuIcon />
            </IconButton>
            {!iconsOnly && (
              <Box p={4}>
                <IconLogo />
              </Box>
            )}
          </Grid>
        </Grid>
        <Grid item>{props.children}</Grid>
      </Grid>

      {isMenuShown && (
        <Menu onClose={() => setMenuShown(true)} iconsOnly={iconsOnly} />
      )}
    </>
  );
};

export default SideMenu;
