import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import IconLogo from '../../UI/IconLogo';
import MenuItem from './MenuItem/MenuItem';
import {
	AppBarStyled,
	DrawerHeaderStyled,
	DrawerStyled,
	LogoStyled,
} from './MenuStyled';

const Menu = ({ open, handleDrawerClose, handleDrawerOpen }) => {
	const theme = useTheme();

	return (
		<>
			<AppBarStyled
				position="fixed"
				open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: 'none' }),
						}}>
						<MenuIcon />
					</IconButton>
					<LogoStyled
						variant="h6"
						noWrap
						component="div">
						<IconLogo />
					</LogoStyled>
				</Toolbar>
			</AppBarStyled>
			<DrawerStyled
				variant="permanent"
				open={open}>
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
