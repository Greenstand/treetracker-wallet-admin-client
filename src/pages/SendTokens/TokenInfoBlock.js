import { Box, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/system';
import tokenIcon from './tokens.svg';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

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
    <Grid item container spacing={1} sx={{ border: '1px solid green' }}>
      <Grid item>
        <Grid container spacing={1}>
          <Grid item>
            <AmountText>{tokenAmount}</AmountText>
          </Grid>
          <Grid item>
            <SubText>{subText}</SubText>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};


const TokenInfoBlock = () => {
  return (
    <Box sx={{ width: '255px' }}>
      <Grid container sx={{ border: '1px solid red' }}>
        <Grid item xs={3} sx={{ border: '1px solid black' }}>
          <Box sx={{ paddingX: '5px', paddingY: '10px', width: '50px', height: '60px' }}>
            <img src={tokenIcon} alt='Token Icon' />
          </Box>
        </Grid>

        <Grid item xs={9}>
          <TokenDisplay subText='Available tokens' tokenAmount='150000' />


          <Divider light />
          <TokenDisplay subText='WalletA tokens' tokenAmount='30000' />
        </Grid>

      </Grid>
    </Box>

  );
};

export default TokenInfoBlock;