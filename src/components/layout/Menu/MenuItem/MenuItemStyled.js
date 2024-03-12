import { ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const LinkItemStyled = styled(NavLink)(({ theme, isActive }) => ({
  textDecoration: 'none',
  color: isActive ? theme.palette.primary.main : theme.palette.primary.lightMain,
  backgroundColor: isActive ? theme.palette.action.active: null,
  borderTopRightRadius: isActive ? '25px': null,
  borderBottomRightRadius: isActive ? '25px': null,
  width: isActive ? '14.5rem' : null,
}));

const ItemButtonStyled = styled(ListItemButton)(({ open }) => ({
  minHeight: 48,
  justifyContent: open ? 'initial' : 'center',
  px: 2.5,
}));

const ItemIconStyled = styled(ListItemIcon)(({ open }) => ({
  minWidth: 0,
  mr: open ? 3 : 'auto',
  justifyContent: 'center',
}));

export { ItemButtonStyled, ItemIconStyled, LinkItemStyled };
