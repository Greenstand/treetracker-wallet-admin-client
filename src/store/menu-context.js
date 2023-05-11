import { createContext } from "react";

const MenuContext = createContext({
  isMenuCollapsed: false,
  onMenuToggle: () => {},
});

export default MenuContext;
