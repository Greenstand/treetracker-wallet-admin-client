import { ItemButtonStyled, ItemIconStyled, LinkItemStyled } from './MenuItemStyled';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/system';
const StyledBadge = styled(Badge)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));


const LinkItem = ({ itemPath, itemName, itemIcon, isActive, open, pendingCount }) => {
  return (

    <LinkItemStyled to={itemPath} isActive={isActive}>
      <ItemButtonStyled open={open}>
        <ItemIconStyled open={open}>
          {itemIcon}
        </ItemIconStyled>
        <ListItemText
          primary={itemName}
          sx={{ opacity: open ? 1 : 0, marginLeft: open ? '1rem' : 0, fontWeight: 'bold' }}
        />
      { pendingCount &&
              <StyledBadge
              badgeContent={pendingCount}
              color="error"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            > 
            </StyledBadge>
      }
      </ItemButtonStyled>
    </LinkItemStyled>

  );
};

export default LinkItem; 