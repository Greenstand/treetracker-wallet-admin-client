import { ItemButtonStyled, ItemIconStyled, LinkItemStyled } from './MenuItemStyled';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';


const LinkItem = ({ itemPath, itemName, itemIcon, isActive, open }) => {
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
      </ItemButtonStyled>
    </LinkItemStyled>

  );
};

export default LinkItem; 