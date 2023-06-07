import MenuIcon from '@mui/icons-material/Menu';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import React, { useContext } from 'react';
import MenuContext from '../../../store/menu-context';
import IconLogo from '../../UI/IconLogo';
import Menu from './Menu/Menu';

const SideMenu = (props) => {
	const menuCtx = useContext(MenuContext);

	function handleMenuClick() {
		menuCtx.onMenuToggle();
	}

	return (
		<>
			<Grid
				container
				direction="column"
				justifyContent="space-between"
				spacing={5}>
				<Grid item>
					<Grid
						container
						direction="row"
						alignItems="center">
						<IconButton
							title="menu"
							onClick={() => handleMenuClick()}
							style={menuCtx.isMenuCollapsed ? { width: '100%' } : {}}>
							<MenuIcon />
						</IconButton>
						{!menuCtx.isMenuCollapsed && (
							<Box p={4}>
								<IconLogo />
							</Box>
						)}
					</Grid>
				</Grid>
				<Grid item>{props.children}</Grid>
			</Grid>
			<Menu />
		</>
	);
};

export default SideMenu;
