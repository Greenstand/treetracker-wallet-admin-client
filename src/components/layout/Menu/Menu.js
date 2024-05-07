import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import MenuItem from './MenuItem/MenuItem';
import { DrawerHeaderStyled, DrawerStyled } from './MenuStyled';
import TopMenu from './TopMenu/TopMenu';

const Menu = ({ open, handleDrawerClose, handleDrawerOpen }) => {
  const theme = useTheme();

  return (
    <>
      <TopMenu handleDrawerOpen={handleDrawerOpen} open={open} />
      <DrawerStyled variant="permanent" open={open}>
        <DrawerHeaderStyled>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeaderStyled>
          <MenuItem open={open} />
      </DrawerStyled>
    </>
  );
};

export default Menu;
