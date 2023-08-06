import { Grid } from '@mui/material';
import { WalletLogo, WalletPendingTransfers, WalletTitle } from './WalletHeaderStyled';

const defaultLogoURL = 'https://placehold.co/192x192';

const WalletHeader = ({ pendingTransfers, walletName, walletLogoURL }) => {
  return (
    <Grid container spacing={8} sx={{ marginBottom: '30px' }}>
      <Grid item xs={4}>
        <WalletLogo
          src={walletLogoURL ? walletLogoURL : defaultLogoURL}
          alt={'Wallet Logo'}
        />
      </Grid>
      <Grid item container xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
        <WalletTitle>{walletName}</WalletTitle>
        <WalletPendingTransfers>
          Pending transfers - {pendingTransfers}
        </WalletPendingTransfers>
      </Grid>
    </Grid>
  );
};

export default WalletHeader;