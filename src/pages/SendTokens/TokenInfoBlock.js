import { Paper, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import tokenIcon from './tokens.svg';

// const

const SubText = styled(Typography)({
  fontSize: 16,
  lineHeight: 1,
  fontWeight: 700,
  color: 'rgb(97,137,47)',
});

const AmountText = styled(Typography)({
  fontSize: 24,
  lineHeight: 1,
  fontWeight: 700,
  color: 'rgb(97,137,47)',
});

const TokenDisplay = ({ tokenAmount, subText }) => {
  return (
    <div style={{}}>
      <Grid item xs={4}>
        <AmountText>{tokenAmount}</AmountText>
      </Grid>
      <Grid item xs={5}>
        <SubText>{subText}</SubText>
      </Grid>
    </div>

  );
};

const TokenIcon = styled(Box)({
  paddingX: '5px', paddingY: '10px',
});

const TokenInfoBlock = () => {
  return (
    <Paper sx={{ maxWidth: '255px', border: '1px solid purple' }}>
      <Grid container sx={{ border: '1px solid red', height: '100%' }}>
        <Grid container>
          <Grid item xs={3} sx={{ border: '1px solid black' }}>
            <TokenIcon>
              <img src={tokenIcon} alt='Token Icon' />
            </TokenIcon>
          </Grid>

          <TokenDisplay subText='Available tokens' tokenAmount='150000' />
        </Grid>

        <Grid item xs={2}>

        </Grid>
        <div style={{ borderTop: '2px solid rgb(97,137,47)' }}>
          <TokenDisplay subText='WalletA tokens' tokenAmount='30000' />
        </div>


      </Grid>
    </Paper>

  );
};

export default TokenInfoBlock;