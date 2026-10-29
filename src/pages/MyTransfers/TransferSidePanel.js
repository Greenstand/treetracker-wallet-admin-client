import {
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import {
  DrawerStyled,
  DrawerHeaderStyled,
  BoldTypography,
  NormalTypography,
  DeclineButton,
  AcceptButton,
  CancelButton,
} from './TransferSidePanel.styled.js';
import CustomTooltip from '../TrustRelationship/CustomTooltip.js';
import AuthContext from '../../store/auth-context.js';
import {
  acceptTransfer,
  declineTransfer,
  cancelTransfer,
} from '../../api/transfers.js';
import { useTransfersContext } from '../../store/TransfersContext.js';

function TransferSidePanel({ open, onClose, rowInfo }) {
  const { setRefetch, managedWallets = { wallets: [] } } = useTransfersContext();
  const authContext = useContext(AuthContext);
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  const token = authContext.token;

  const handleAccept = async (id) => {
    try {
      await acceptTransfer({ id, token });
      onClose();
      setRefetch(true);
    } catch (error) {
      console.error('Error accepting transfer:', error);
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineTransfer({ id, token });
      onClose();
      setRefetch(true);
    } catch (error) {
      console.error('Error declining transfer:', error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelTransfer({ id, token });
      onClose();
      setRefetch(true);
    } catch (error) {
      console.error('Error cancelling transfer:', error);
    }
  };

  const managedWalletsWithDefault = managedWallets.wallets ? managedWallets : { ...managedWallets, wallets: [] };

  const receiverWallet = rowInfo?.receiver_wallet || rowInfo?.destination_wallet;
  const senderWallet = rowInfo?.sender_wallet || rowInfo?.originating_wallet;
  const canAcceptDecline = 
    receiverWallet &&
    (wallet.name === receiverWallet ||
    managedWalletsWithDefault.wallets.some(w => w.name === receiverWallet));
  
  const canCancel = 
    senderWallet &&
    rowInfo?.status === 'pending' &&
    (wallet.name === senderWallet ||
    managedWalletsWithDefault.wallets.some(w => w.name === senderWallet));

  return (
    <DrawerStyled variant="permanent" open={open} anchor="right">
      <div style={{ height: '100%', marginTop: '3rem', overflow: 'hidden' }}>
        <DrawerHeaderStyled>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeaderStyled>

        <Typography
          variant="h4"
          sx={{ fontWeight: '700', margin: 'auto 3rem' }}
        >
          Transfer Request
        </Typography>
        <div style={{ padding: '1rem 2rem', display: 'flex', margin: '1rem 1rem', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Transfer ID:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo?.transfer_id || rowInfo?.id || '--'} maxChars={15} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Sender Wallet:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo?.sender_wallet || '--'} maxChars={15} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Receiver Wallet:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo?.receiver_wallet || rowInfo?.destination_wallet || '--'} maxChars={15} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Initiated By:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo?.initiated_by || '--'} maxChars={15} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Created Date:</BoldTypography>
            <NormalTypography>
              {rowInfo?.created_date.split('T')[0] || '--'}
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '120px' }}>Token Amount:</BoldTypography>
            <NormalTypography>
              {rowInfo?.token_amount || '--'}
            </NormalTypography>
          </div>
        </div>

        {rowInfo?.status === 'pending' && canAcceptDecline && (
          <div
            style={{
              margin: '2rem auto',
              display: 'flex',
              justifyContent: 'space-between',
              width: 'fit-content',
              gap: '1rem',
            }}
          >
            <AcceptButton
              variant="contained"
              color="primary"
              onClick={() => handleAccept(rowInfo.id || rowInfo.transfer_id)}
            >
              Accept Transfer
            </AcceptButton>
            <DeclineButton onClick={() => handleDecline(rowInfo.id || rowInfo.transfer_id)}>
              Decline
            </DeclineButton>
          </div>
        )}

        {rowInfo?.status === 'pending' && canCancel && (
          <div
            style={{
              margin: '2rem auto',
              display: 'flex',
              justifyContent: 'center',
              width: 'fit-content',
              gap: '1rem',
            }}
          >
            <CancelButton
              variant="contained"
              onClick={() => handleCancel(rowInfo.id || rowInfo.transfer_id)}
            >
              Cancel Transfer
            </CancelButton>
          </div>
        )}
      </div>
    </DrawerStyled>
  );
}

export default TransferSidePanel;

