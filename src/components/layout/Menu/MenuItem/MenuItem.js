import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export default function MenuItem({ open }) {
	return (
		<List>
			{['Home', 'Transfer Status'].map((text, index) => (
				<ListItem
					key={text}
					disablePadding
					sx={{ display: 'block' }}>
					<ListItemButton
						sx={{
							minHeight: 48,
							justifyContent: open ? 'initial' : 'center',
							px: 2.5,
						}}>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: open ? 3 : 'auto',
								justifyContent: 'center',
							}}>
							{index % 2 === 0 ? <HomeIcon /> : <ThumbsUpDownIcon />}
						</ListItemIcon>
						<ListItemText
							primary={text}
							sx={{ opacity: open ? 1 : 0 }}
						/>
					</ListItemButton>
				</ListItem>
			))}
		</List>
	);
}
