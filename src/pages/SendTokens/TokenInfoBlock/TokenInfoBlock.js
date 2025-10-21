import { Grid, Paper } from '@mui/material';
import tokenIcon from './tokens.svg';
import { AmountText, SubText } from './TokenInfoBlockStyled';

// TODO: uncomment when API is ready
// const SubWalletInfo = ({ senderWalletName, senderWalletTokens }) => {
//   return (
//     <>
//       <Grid item xs={3}></Grid>
//       <Grid item xs={9} sx={{ borderTop: '1px solid rgb(97,137,47)' }}></Grid>

//       <Grid item xs={3} sx={{ minHeight: '65px' }}></Grid>
//       <Grid item xs={5}>
//         <AmountText>{senderWalletTokens}</AmountText>
//       </Grid>
//       <Grid item xs={4}>
//         <SubText>{senderWalletName} Tokens</SubText>
//       </Grid>
//     </>
//   );
// };

const TokenInfoBlock = ({
  inWallet = 0,
  pendingTransfer = 0,
  available = 0,
  // senderWalletName = null,
}) => {
  const calculatedAvailable = available || (inWallet - pendingTransfer);

  return (
    <Paper
      sx={{
        minWidth: '20rem',
        boxShadow: 'none',
        padding: '1rem 2rem 0 0',
      }}
    >
      <Grid container sx={{ alignItems: 'center' }}>
        <Grid item xs={3} sx={{ paddingX: '5px', paddingY: '10px' }}>
          <img src={tokenIcon} alt="Token Icon" />
        </Grid>

        <Grid item xs={5}>
          <AmountText>{inWallet?.toLocaleString() || '0'}</AmountText>
        </Grid>
        <Grid item xs={4}>
          <SubText>Tokens In Wallet</SubText>
        </Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={9} sx={{ borderTop: '1px solid rgb(97,137,47)', marginY: '8px' }}></Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={5}>
          <AmountText>
            {pendingTransfer > 0 ? `${pendingTransfer.toLocaleString()}` : '0'}
          </AmountText>
        </Grid>
        <Grid item xs={4}>
          <SubText>Tokens Pending Transfer</SubText>
        </Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={9} sx={{ borderTop: '1px solid rgb(97,137,47)', marginY: '8px' }}></Grid>

        <Grid item xs={3}></Grid>
        <Grid item xs={5}>
          <AmountText>{calculatedAvailable?.toLocaleString() || '0'}</AmountText>
        </Grid>
        <Grid item xs={4}>
          <SubText>Tokens Available</SubText>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TokenInfoBlock;