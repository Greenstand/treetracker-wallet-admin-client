import Box from '@mui/material/Box';
import * as React from 'react';
import { StyledContent } from './LayoutStyled';
import Menu from './Menu/Menu';

export default function Layout({ children }) {
	const [open, setOpen] = React.useState(false);

	const handleDrawerClose = () => {
		setOpen(false);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<Menu
				open={open}
				setOpen={setOpen}
				handleDrawerClose={handleDrawerClose}
			/>
			<StyledContent
				container
				onClick={handleDrawerClose}>
				{children}
			</StyledContent>
		</Box>
	);
}
