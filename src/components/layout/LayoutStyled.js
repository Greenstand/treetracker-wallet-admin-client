import { Drawer, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { MENU_WIDTH, MENU_WIDTH_COLLAPSED } from './SideMenu/Menu/MenuStyled';

export const StyledRoot = styled('div')(() => ({
	display: 'flex',
}));

export const StyledDrawer = styled(Drawer)(({ menuCollapsed }) => ({
	width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
	flexShrink: 0,
}));

export const StyledDrawerPaper = styled(Paper)(({ menuCollapsed }) => ({
	width: menuCollapsed ? MENU_WIDTH_COLLAPSED : MENU_WIDTH,
	height: '100vh',
}));

export const StyledContent = styled(Grid)(({ theme }) => ({
	flexGrow: 1,
	padding: `0 ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
	backgroundColor: 'rgb(239, 239, 239)',
	minHeight: '100vh',
	height: '100%',
	width: 'unset',
}));
