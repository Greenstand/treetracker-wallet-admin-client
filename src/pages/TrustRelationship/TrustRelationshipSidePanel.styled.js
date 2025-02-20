import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/system";
import { Typography, Button  } from "@mui/material";


const drawerWidth = 320;
const mobileDrawerWidth = 140;

const openedMixin = (theme) => ({
  width: mobileDrawerWidth,
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
  },
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeaderStyled = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: mobileDrawerWidth,
  [theme.breakpoints.up("sm")]: {
    width: drawerWidth,
  },
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const BoldTypography = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '.9rem'
});

const NormalTypography = styled(Typography)({
  fontWeight: 400,
  fontSize: '.9rem',
  textTransform: 'capitalize'
});

const TallTypography = styled(Typography)({
  height: '40px',
  display: 'flex',  
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
});

const DeclineButton = styled(Button)({
  textTransform: 'none',
  padding: 0,
  minWidth: 0,
  border: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  margin: '0 10px', 
  color: '#FF7A00',
  '&:hover': {
    border: 'none', 
  }
});
const DeleteButton = styled(Button)({
  textTransform: 'none',
  padding: 0,
  minWidth: 0,
  border: 'none',
  fontWeight: 700,
  fontSize: '1rem',
  margin: '0 10px', 
  color: 'white',
  '&:hover': {
    border: 'none', 
  }
});

const AcceptButton = styled(Button)({
  textTransform: 'none',
  minWidth: 0,
  borderRadius: '20px',
  fontWeight: 500,
  fontSize: '1rem',
  padding: '6px 15px',
  margin: '0 10px', 
});


export { DrawerHeaderStyled, DrawerStyled, BoldTypography, NormalTypography, TallTypography, DeclineButton, AcceptButton, DeleteButton };
