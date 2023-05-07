import React, { useContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import MenuItem from "./MenuItem/MenuItem";
import MenuContext from "../../../../store/menu-context";
import { MenuContainer } from "./MenuStyled";

const Menu = () => {
  const menuCtx = useContext(MenuContext);

  const iconsOnly = menuCtx.isMenuCollapsed;

  const menu = (
    <>
      <MenuItem
        linkTo="/"
        text="Home"
        iconsOnly={iconsOnly}
        icon={<HomeIcon />}
      />
      <MenuItem
        linkTo="/transfer-status"
        text="Transfer Status"
        iconsOnly={iconsOnly}
        icon={<ThumbsUpDownIcon />}
      />
    </>
  );

  return <MenuContainer iconsOnly={iconsOnly}>{menu}</MenuContainer>;
};

export default Menu;
