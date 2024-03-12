import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import * as React from 'react';
import LinkItem from './LinkItem';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/system';
import { useTrustRelationshipsContext } from '../../../../store/TrustRelationshipsContext';
import { useState, useEffect } from 'react';
const StyledBadge = styled(Badge)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}));

const MenuItem = ({ open }) => { 
  const [isHovered, setIsHovered] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { tableRows } = useTrustRelationshipsContext();

  useEffect(() => {
      let count = 0;

      for (let i = 0; i < tableRows.length; i++) {
        if (tableRows[i].state === 'pending') {
          count++;
        }  
      }
      setPendingCount(count);  
    }, [tableRows]);
  console.log(tableRows);
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
       {
        pendingCount > 0 && open ?
      <div style={{ display: 'flex', 
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
        open={open}
      />
    <StyledBadge
      badgeContent={pendingCount}
      color="error"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    > 
    </StyledBadge>
    </div>
     :
     <LinkItem
     itemPath={'/trust-relationship'}
     itemName={'Trust Relationship'}
     itemIcon={<HandshakeIcon />}
     open={open}
   />
     }
    </>
  );
};

export default MenuItem;
