import { styled } from "@mui/system";

export const MENU_WIDTH = 232;
export const MENU_WIDTH_COLLAPSED = 55;

export const MenuContainer = styled("div")((props) => ({
  width: props.iconsOnly ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
}));
