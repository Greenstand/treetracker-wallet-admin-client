import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import * as React from 'react';
import { Compare } from '@mui/icons-material';
import LinkItem from './LinkItem';

const MenuItem = ({ open }) => {
  return (
    <>
      <LinkItem itemPath={'/'}
                itemName={'Home'}
                itemIcon={<HomeIcon />}
                open={open} />
      <LinkItem itemPath={'/send-tokens'}
                itemName={'Send Tokens'}
                itemIcon={<ThumbsUpDownIcon />}
                open={open} />
      <LinkItem itemPath={'/transfer-status'}
                itemName={'Transfer Status'}
                itemIcon={<Compare />}
                open={open} />
    </>
  );
};

export default MenuItem;
