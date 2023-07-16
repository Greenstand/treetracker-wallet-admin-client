import { Paper, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import tokenIcon from './tokens.svg';


const SubText = styled(Typography)({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
});

const AmountText = styled(Typography)({
  fontSize: 24,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
});


const TokenInfoBlock = ({ totalTokens, subWalletName = null, subWalletTokens = null }) => {
  return (
    <Paper sx={{ maxWidth: '255px' }}>
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
          <>
            <Grid item xs={3}>
            </Grid>
            <Grid item xs={9} sx={{ borderTop: '2px solid rgb(97,137,47)' }}>
            </Grid>

            <Grid item xs={3} sx={{ height: '65px' }}>
            </Grid>
            <Grid item xs={5}>
              <AmountText>{subWalletTokens}</AmountText>
            </Grid>
            <Grid item xs={4} sx={{ justifyContent: 'center' }}>
              <SubText>{subWalletName} Tokens</SubText>
            </Grid>
          </>
        }
      </Grid>
    </Paper>

  );
};

export default TokenInfoBlock;