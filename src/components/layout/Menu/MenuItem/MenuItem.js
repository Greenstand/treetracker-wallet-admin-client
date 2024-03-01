import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import * as React from 'react';
import LinkItem from './LinkItem';

const MenuItem = ({ open }) => {
  return (
    <>
      <LinkItem
        itemPath={'/'}
        itemName={'Home'}
        itemIcon={<HomeIcon />}
        open={open}
      />
      <LinkItem
        itemPath={'/send-tokens'}
        itemName={'Send Tokens'}
        itemIcon={<ThumbsUpDownIcon />}
        open={open}
      />
      <LinkItem
        itemPath={'/my-transfers'}
        itemName={'My Transfers'}
        itemIcon={<CompareIcon />}
        open={open}
      />
      <LinkItem
        itemPath={'/list-wallets'}
        itemName={'My Wallets'}
        itemIcon={<AccountBalanceWalletRoundedIcon />}
        open={open}
      />
      <LinkItem
        itemPath={'/trust-relationship'}
        itemName={'Trust Relationship'}
        itemIcon={<HandshakeIcon />}
        open={open}
      />
    </>
  );
};

export default MenuItem;
