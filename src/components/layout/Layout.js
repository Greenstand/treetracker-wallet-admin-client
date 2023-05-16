import React, { useState } from "react";
import SideMenu from "./SideMenu/SideMenu";
import MenuContext from "../../store/menu-context";
import {
  StyledContent,
  StyledDrawer,
  StyledDrawerPaper,
  StyledRoot,
} from "./LayoutStyled";

const Layout = ({ children }) => {
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const menuToggleHandler = () => {
    setMenuCollapsed((value) => !value);
  };

  return (
    <StyledRoot>
      <MenuContext.Provider
        value={{
          isMenuCollapsed: menuCollapsed,
          onMenuToggle: menuToggleHandler,
        }}
      >
        <StyledDrawer
          variant="permanent"
          open={true}
          menuCollapsed={menuCollapsed}
        >
          <StyledDrawerPaper menuCollapsed={menuCollapsed}>
            <SideMenu
              onMenuToggle={menuToggleHandler}
              isMenuCollapsed={menuCollapsed}
            />
          </StyledDrawerPaper>
        </StyledDrawer>
        <StyledContent container>{children}</StyledContent>
      </MenuContext.Provider>
    </StyledRoot>
  );
};

export default Layout;
