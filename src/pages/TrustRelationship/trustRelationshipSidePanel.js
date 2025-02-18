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
  DeleteButton
} from './TrustRelationshipSidePanel.styled.js';
import CustomTooltip from './CustomTooltip.js';
import AuthContext from '../../store/auth-context.js';
import {
  acceptTrustRelationship,
  declineTrustRelationship,
  deleteTrustRelationship
} from '../../api/trust_relationships.js';
import { useTrustRelationshipsContext } from '../../store/TrustRelationshipsContext.js';

function TrustRelationshipSidePanel({ open, onClose, rowInfo }) {
  const { setRefetch, managedWallets = { wallets: [] } } = useTrustRelationshipsContext();
  const authContext = useContext(AuthContext);
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  const token = authContext.token;

  const handleAccept = (id) => {
    acceptTrustRelationship({ id, token });
    onClose();
    setRefetch(true);
  };

  const handleDecline = (id) => {
    declineTrustRelationship({ id, token });
    onClose();
    setRefetch(true);
  };

  const handleDelete = (id) => {
    deleteTrustRelationship({ id, token });
    onClose();
    setRefetch(true);
  };

  const managedWalletsWithDefault = managedWallets.wallets ? managedWallets : { ...managedWallets, wallets: [] };

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
          Establish Trust
        </Typography>
        <Typography
          variant="h4"
          sx={{ fontWeight: '700', margin: 'auto 3.5rem' }}
        >
          Relationship
        </Typography>
        <div style={{ padding: '1rem 2rem', display: 'flex', margin: '1rem 1rem', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '100px' }}>Source Wallet:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo.actor_wallet} maxChars={20} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '100px' }}>Target Wallet:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo.target_wallet} maxChars={20} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem' }}>
            <BoldTypography style={{ minWidth: '100px' }}>Initiated By:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo.originating_wallet} maxChars={20} />
            </NormalTypography>
          </div>

          <div style={{ display: 'flex', gap: '0.9rem' }}>
            <BoldTypography style={{ minWidth: '100px' }}>Request Type:</BoldTypography>
            <NormalTypography>
              <CustomTooltip content={rowInfo.request_type} maxChars={20} />
            </NormalTypography>
          </div>
        </div>


        {rowInfo.state === 'trusted' && (
          <div
            style={{
              margin: '2rem auto',
              backgroundColor: 'red',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              width: 'fit-content',
            }}
          >
            <DeleteButton onClick={() => handleDelete(rowInfo.id)}>
              Delete
            </DeleteButton>
          </div>
        )}

        {rowInfo.state === 'requested' && (
          managedWalletsWithDefault.wallets.some(wallet => wallet.name === rowInfo.target_wallet) || wallet.name === rowInfo.target_wallet ? (
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
                onClick={() => handleAccept(rowInfo.id)}
              >
                Accept
              </AcceptButton>
              <DeclineButton onClick={() => handleDecline(rowInfo.id)}>
                Decline
              </DeclineButton>
            </div>
          ) : (
            <div
              style={{
                margin: '2rem auto',
                backgroundColor: 'red',
                borderRadius: '8px',
                padding: '10px',
                textAlign: 'center',
                width: 'fit-content',
              }}
            >
              <DeleteButton onClick={() => handleDelete(rowInfo.id)}>
                Delete
              </DeleteButton>
            </div>
          )
        )}

        {(rowInfo.state === 'cancelled_by_target' || rowInfo.state === 'cancelled_by_originator') && null}
      </div>
    </DrawerStyled>
  );
}

export default TrustRelationshipSidePanel;
