import { ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const LinkItemStyled = styled(NavLink)(({ theme, isActive }) => ({
  textDecoration: 'none',
  color: isActive ? theme.palette.stats.white : theme.palette.primary.lightMain,
  backgroundColor: isActive ? theme.palette.action.active : null,
  width: '14.5rem',
}));

const ItemButtonStyled = styled(ListItemButton)(({ open }) => ({
  minHeight: 48,
  justifyContent: open ? 'initial' : 'center',
  px: 2.5,
}));

const ItemIconStyled = styled(ListItemIcon)(({ open, theme, isActive }) => ({
  minWidth: 0,
  mr: open ? 3 : 'auto',
  justifyContent: 'center',
  color: isActive ? theme.palette.stats.white : theme.palette.primary.lightMain,
}));

export { ItemButtonStyled, ItemIconStyled, LinkItemStyled };
