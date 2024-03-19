import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import HandshakeIcon from '@mui/icons-material/Handshake';
import * as React from 'react';
import LinkItem from './LinkItem';
import { useTrustRelationshipsContext } from '../../../../store/TrustRelationshipsContext';
import { useState, useEffect } from 'react';


const MenuItem = ({ open }) => { 
  const [isHovered, setIsHovered] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const { tableRows } = useTrustRelationshipsContext();

  console.log("my data",tableRows);

  useEffect(() => {
      let count = 0;

      for (let i = 0; i < tableRows.length; i++) {
        if (tableRows[i].state === 'pending') {
          count++;
        }  
      }
      setPendingCount(count);  
    }, [tableRows]);
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
        isActive={location.pathname === '/trust-relationship'}
        open={open}
        pendingCount={pendingCount}
      />

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
