import { Grid } from '@mui/material';
import { DefaultLogo, WalletLogo, WalletPendingTransfers, WalletTitle } from './WalletHeaderStyled';

const WalletHeader = ({ pendingTransfers, walletName, walletLogoURL }) => {
  return (
    <Grid container spacing={8} sx={{ marginBottom: '30px' }}>
      <Grid item xs={4}>
        {walletLogoURL ?
          <WalletLogo
            src={walletLogoURL}
            alt={'Wallet Logo'}
          /> :
          <DefaultLogo />
        }
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