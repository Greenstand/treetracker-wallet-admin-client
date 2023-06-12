import { ListItemButton, ListItemIcon } from '@mui/material';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const LinkItemStyled = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.lightMain,
  fontWeight: 'normal',
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
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
