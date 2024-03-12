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
        isActive={location.pathname === '/'}
        open={open}
      />
      <LinkItem
        itemPath={'/send-tokens'}
        itemName={'Send Tokens'}
        itemIcon={<ThumbsUpDownIcon />}
        isActive={location.pathname === '/send-tokens'}
        open={open}
      />
      <LinkItem
        itemPath={'/my-transfers'}
        itemName={'My Transfers'}
        itemIcon={<CompareIcon />}
        isActive={location.pathname === '/my-transfers'}
        open={open}
      />
      <LinkItem
        itemPath={'/list-wallets'}
        itemName={'My Wallets'}
        itemIcon={<AccountBalanceWalletRoundedIcon />}
        isActive={location.pathname === '/list-wallets'}
        open={open}
      />
      <LinkItem
        itemPath={'/trust-relationship'}
        itemName={'Trust Relationship'}
        itemIcon={<HandshakeIcon />}
        isActive={location.pathname === '/trust-relationship'}
        open={open}
      />
    </>
  );
};

export default MenuItem;
