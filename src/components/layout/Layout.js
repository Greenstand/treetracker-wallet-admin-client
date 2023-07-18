import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledContent } from "./LayoutStyled";
import Menu from "./Menu/Menu";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const mobile = useMediaQuery("(max-width:480px)");

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerCloseAuto = () => {
    if (mobile) {
      setOpen(false);
    }
  };
  const handleResponsiveDrawerClose = () => {
    if (mobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  let location = useLocation();

  useEffect(() => {
    handleResponsiveDrawerClose();
  }, [location]);

  return (
    <Box sx={{ display: "flex" }}>
      <Menu
        open={open}
        handleDrawerClose={handleDrawerClose}
        handleDrawerOpen={handleDrawerOpen}
      />
      <StyledContent container onClick={handleDrawerCloseAuto}>
        {children}
      </StyledContent>
    </Box>
  );
};

export default Layout;
