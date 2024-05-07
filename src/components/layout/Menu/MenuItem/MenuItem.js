import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import * as React from 'react';
import LinkItem from './LinkItem';
import { useTrustRelationshipsContext } from '../../../../store/TrustRelationshipsContext';
import { useState } from 'react';

const MenuItem = ({ open }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { count } = useTrustRelationshipsContext();

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
      {count > 0 && open ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isHovered ? '#E1F2E89C' : 'transparent',
          }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          <LinkItem
            itemPath={'/trust-relationship'}
            itemName={'Trust Relationship'}
            itemIcon={<HandshakeIcon />}
            isActive={location.pathname === '/trust-relationship'}
            open={open}
            pendingCount={count}
          />
        </div>
      ) : (
        <LinkItem
          itemPath={'/trust-relationship'}
          itemName={'Trust Relationship'}
          itemIcon={<HandshakeIcon />}
          isActive={location.pathname === '/trust-relationship'}
          open={open}
        />
      )}
      <LinkItem
        itemPath={'/customize-wallet'}
        itemName={'Customize Wallet'}
        itemIcon={<DriveFileMoveIcon />}
        open={open}
      />
    </>
  );
};

export default MenuItem;
