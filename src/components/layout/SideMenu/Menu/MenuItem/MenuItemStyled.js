import { styled } from "@mui/system";
import {
  ListItemIcon,
  ListItemText,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";

export const StyledMenuItem = styled(MuiMenuItem)(({ theme }) => ({
  minHeight: 0,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
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
}));

export const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 46,
});

export const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  "& .MuiTypography-body1": {
    fontWeight: 700,
  },
}));

export const LinkItemText = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.primary.lightMain,
  fontWeight: "normal",
  "&.active": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));
