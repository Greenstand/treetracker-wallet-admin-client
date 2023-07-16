import { Paper, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import tokenIcon from './tokens.svg';


const SubText = styled(Typography)({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
  overflowWrap: 'break-word',
  padding: '10px',
});

const AmountText = styled(Typography)({
  fontSize: 24,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
  overflowWrap: 'break-word',
  paddingTop: '10px',
  paddingBottom: '10px',
});


const SubWalletInfo = ({ subWalletName, subWalletTokens }) => {
  return (
    <>
      <Grid item xs={3}>
      </Grid>
      <Grid item xs={9} sx={{ borderTop: '1px solid rgb(97,137,47)' }}>
      </Grid>

      <Grid item xs={3} sx={{ minHeight: '65px' }}>
      </Grid>
      <Grid item xs={5}>
        <AmountText>{subWalletTokens}</AmountText>
      </Grid>
      <Grid item xs={4}>
        <SubText>{subWalletName} Tokens</SubText>
      </Grid>
    </>
  );
};

const TokenInfoBlock = ({ totalTokens, subWalletName = null, subWalletTokens = null }) => {
  return (
    <Paper sx={{ width: '255px' }}>
      <Grid container sx={{ alignItems: 'center' }}>

        <Grid item xs={3} sx={{ paddingX: '5px', paddingY: '10px' }}>
          <img src={tokenIcon} alt='Token Icon' />
        </Grid>
        <Grid item xs={5}>
          <AmountText>{totalTokens}</AmountText>
        </Grid>
        <Grid item xs={4}>
          <SubText>Available Tokens</SubText>
        </Grid>

        {subWalletName && subWalletTokens &&
          <SubWalletInfo subWalletTokens={subWalletTokens} subWalletName={subWalletName} />
        }
      </Grid>
    </Paper>

  );
};

export default TokenInfoBlock;