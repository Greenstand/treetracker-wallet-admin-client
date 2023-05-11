import { styled } from "@mui/system";
import { Drawer, Grid, Paper } from "@mui/material";
import { MENU_WIDTH, MENU_WIDTH_COLLAPSED } from "./SideMenu/Menu/MenuStyled";

export const StyledRoot = styled("div")(({ theme }) => ({
  display: "flex",
}));

export const StyledDrawer = styled(Drawer)(({ menuCollapsed, theme }) => ({
  width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
  flexShrink: 0,
}));

export const StyledDrawerPaper = styled(Paper)(({ menuCollapsed, theme }) => ({
  width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
  height: "100vh",
}));

export const StyledContent = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  backgroundColor: "rgb(239, 239, 239)",
  height: "100vh",
}));
