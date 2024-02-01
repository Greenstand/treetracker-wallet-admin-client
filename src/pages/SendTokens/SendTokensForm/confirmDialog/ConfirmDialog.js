import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { AvatarSvgIcon, ArrowSvgIcon, TokenICon } from './SvgIcon';
import { Box, Stack, IconButton } from '@mui/material';


// Consolidated styles for reuse throughout the component
const styles = {
  TokenICon: {
    margin: '0',
    height: '50px',
    width: '50px'
  },
  avatarIcon: {
    borderRadius: '50%',
    backgroundColor: 'rgba(128, 128, 128, 0.438)',
    width: '50px',
    alignItems: 'center',
    justifyContent: 'center'
  },
  walletInfo: {
    fontSize: '15px',
    fontWeight: '500'
  },
  dialogContent: {
    padding: '20px 50px 50px 50px'
  },
  questionText: {
    fontSize: '14px',
    fontWeight: '700'
  },
  actionStack: {
    position: 'absolute',
    bottom: 0,
    right: '50px',
    margin: '16px',
    marginBottom: '20px'
  }
};

// Component to render a token icon at a specific position
const TokenIConPositioned = ({ top, left, zIndex }) => (
  <div style={{ position: 'absolute', top, left, zIndex }}>
    <TokenICon sx={styles.TokenICon} />
  </div>
);

// Component to display wallet information
const WalletInfo = ({ wallet }) => (
  <Stack direction="row" alignItems="center" style={{ justifyContent: 'spaceAround', gap: '4px' }}>
    <Stack direction="row" alignItems="center" sx={styles.avatarIcon}>
      <AvatarSvgIcon />
    </Stack>
    <Typography variant="p" sx={styles.walletInfo}>{wallet}</Typography>
  </Stack>
);

export default function ConfirmDialog({ open, onConfirm, onClose, receiverWallet, senderWallet, tokensAmount }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <DialogContent sx={styles.dialogContent}>
        <Typography variant="p" sx={styles.questionText}>
          Are you sure to make this transfer?
        </Typography>

        <TokenIConPositioned top='34%' left='42%' zIndex={2} />
        <TokenIConPositioned top='30%' left='40%' zIndex={1} />
        <TokenIConPositioned top='37%' left='39%' zIndex={3} />

        <Box mt={15} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Stack direction="row" spacing={6} mt={40}>
            <WalletInfo wallet={senderWallet} />
            <IconButton disableRipple>
              <ArrowSvgIcon />
            </IconButton>
            <WalletInfo wallet={receiverWallet} />
          </Stack>

          <Typography variant="p" mt={0} mb={10} style={{ color: 'rgb(110, 175, 13)', fontWeight: '500' }}>
            {tokensAmount.current.value}
          </Typography>

          <Stack direction="row" mb={10} spacing={2} sx={styles.actionStack}>
            <Button variant="outlined" sx={{ color: 'rgb(110, 175, 13)' }} onClick={onClose}>No</Button>
            <Button variant="contained" sx={{ backgroundColor: 'rgb(110, 175, 13)' }} onClick={onConfirm}>Yes</Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
