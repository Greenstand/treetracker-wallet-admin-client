import styled from '@emotion/styled';
import { Toolbar, Typography } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';

const drawerWidth = 200;
const mobileDrawerWidth = 200;

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  backgroundColor: 'white',
  boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    marginLeft: mobileDrawerWidth,
    width: `calc(100% - ${mobileDrawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const LogoStyled = styled(Typography)(({ theme }) => ({
  '@media(max-width: 480px)': {
    margin: 'auto',
    paddingRight: `calc(${theme.spacing(7)} + 1px)`,
  },
}));

const ToolbarStyled = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export { AppBarStyled, ToolbarStyled, LogoStyled };
