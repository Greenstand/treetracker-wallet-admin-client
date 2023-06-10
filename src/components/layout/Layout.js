import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { StyledContent } from './LayoutStyled';
import Menu from './Menu/Menu';

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let location = useLocation();

  useEffect(() => {
    handleDrawerClose();
  }, [location]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Menu
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <StyledContent
        container
        onClick={handleDrawerClose}>
        {children}
      </StyledContent>
    </Box>
  );
};

export default Layout;
