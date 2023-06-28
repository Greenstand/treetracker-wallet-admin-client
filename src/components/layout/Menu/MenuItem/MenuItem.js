import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';
import {
  ItemButtonStyled,
  ItemIconStyled,
  LinkItemStyled,
} from './MenuItemStyled';

const MenuItem = ({ open }) => {
  return (
    <>
      <LinkItemStyled to="/">
        <ItemButtonStyled open={open}>
          <ItemIconStyled open={open}>
            <HomeIcon />
          </ItemIconStyled>
          <ListItemText
            primary={'Home'}
            sx={{ opacity: open ? 1 : 0, marginLeft: open ? '1rem' : 0 }}
          />
        </ItemButtonStyled>
      </LinkItemStyled>
      <LinkItemStyled to="/send-tokens">
        <ItemButtonStyled open={open}>
          <ItemIconStyled open={open}>
            <ThumbsUpDownIcon />
          </ItemIconStyled>
          <ListItemText
            primary={'Send Tokens'}
            sx={{ opacity: open ? 1 : 0, marginLeft: open ? '1rem' : 0 }}
          />
        </ItemButtonStyled>
      </LinkItemStyled>
      <LinkItemStyled to="/my-transfers">
        <ItemButtonStyled open={open}>
          <ItemIconStyled open={open}>
            <CompareIcon />
          </ItemIconStyled>
          <ListItemText
            primary={'My Transfers'}
            sx={{ opacity: open ? 1 : 0, marginLeft: open ? '1rem' : 0 }}
          />
        </ItemButtonStyled>
      </LinkItemStyled>
    </>
  );
};

export default MenuItem;
