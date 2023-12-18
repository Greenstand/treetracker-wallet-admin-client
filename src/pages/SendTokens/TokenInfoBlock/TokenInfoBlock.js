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
  // totalTokens,
  senderWalletName = null,
  senderWalletTokens = null,
}) => {
  return (
    // TODO: uncomment when API is ready: is should have a totalTokens value and delete the block code below
    // <Paper
    //   sx={{ minWidth: '20rem', boxShadow: 'none', padding: '1rem 2rem 0 0' }}
    // >
    //   <Grid container sx={{ alignItems: 'center' }}>
    //     <Grid item xs={3} sx={{ paddingX: '5px', paddingY: '10px' }}>
    //       <img src={tokenIcon} alt="Token Icon" />
    //     </Grid>
    //     <Grid item xs={5}>
    //       <AmountText>{totalTokens}</AmountText>
    //     </Grid>
    //     <Grid item xs={4}>
    //       <SubText>Available Tokens</SubText>
    //     </Grid>
    //     {senderWalletName && senderWalletTokens && (
    //       <SubWalletInfo
    //         senderWalletTokens={senderWalletTokens}
    //         senderWalletName={senderWalletName}
    //       />
    //     )}
    //   </Grid>
    // </Paper>

    // TODO: delete this block when API is ready and uncomment the block above
    <>
      {senderWalletName && senderWalletTokens && (
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
              <AmountText>{senderWalletTokens}</AmountText>
            </Grid>
            <Grid item xs={4}>
              <SubText>{senderWalletName} Tokens</SubText>
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export default TokenInfoBlock;