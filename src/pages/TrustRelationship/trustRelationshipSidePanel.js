/* eslint-disable no-unused-vars */
import {
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import {
  DrawerStyled,
  DrawerHeaderStyled,
  BoldTypography,
  NormalTypography,
  TallTypography,
  DeclineButton,
  AcceptButton,
  DeleteButton
} from './TrustRelationshipSidePanel.styled.js';
import AuthContext from '../../store/auth-context.js';
import {
  acceptTrustRelationship,
  declineTrustRelationship,
  deleteTrustRelationship
} from '../../api/trust_relationships.js';
import { useTrustRelationshipsContext } from '../../store/TrustRelationshipsContext.js';

function TrustRelationshipSidePanel({ open, onClose, rowInfo }) {

  const { setRefetch } = useTrustRelationshipsContext();
  const authContext = useContext(AuthContext);
  
  const token = authContext.token;

  const handleAccept = (id) => {
    const res = acceptTrustRelationship({ id, token });
    onClose()
        setRefetch(true)
  };

  const handleDecline = (id) => {
    const res = declineTrustRelationship({ id, token });
    onClose()
    setRefetch(true);
  };

  const handleDelete = (id) => {
    const res = deleteTrustRelationship({ id, token });
    onClose()
    setRefetch(true);
  };



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

        <Grid container spacing={3} style={{ margin: '2rem 2.5rem' }}>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <BoldTypography variant="h6" align="flex-start">
                Source Wallet:
              </BoldTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <NormalTypography variant="p" align="flex-start">
                {rowInfo.originating_wallet}
              </NormalTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <BoldTypography variant="h6" align="flex-start">
                Target Wallet:
              </BoldTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <NormalTypography variant="p" align="flex-start">
                {rowInfo.target_wallet}
              </NormalTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <BoldTypography variant="h6" align="flex-start">
                Initiated By:
              </BoldTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <NormalTypography variant="p" align="flex-start">
              {rowInfo.originating_wallet}
              </NormalTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <BoldTypography variant="h6" align="flex-start">
                Request Type:
              </BoldTypography>
            </TallTypography>
          </Grid>
          <Grid item xs={6}>
            <TallTypography elevation={3}>
              <NormalTypography variant="p" align="flex-start">
                {rowInfo.request_type}
              </NormalTypography>
            </TallTypography>
          </Grid>
        </Grid>
        {rowInfo.state === 'requested' && (
          <Grid sx={3} style={{ margin: '5rem 4rem' }}>
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
          </Grid>
      )}
          {rowInfo.state === 'trusted' && (
          <Grid sx={3} style={{ margin: '5rem 7.2rem', backgroundColor: 'red', borderRadius: 8, padding: '10px' }}>
            <DeleteButton onClick={() => handleDelete(rowInfo.id)}>
              Delete
            </DeleteButton>
          </Grid>
         )}
      </div>
    </DrawerStyled>
  );
}

export default TrustRelationshipSidePanel;
