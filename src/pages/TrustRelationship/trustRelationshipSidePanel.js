import {
    Typography,
    Button, 
    IconButton,
    List, 
    ListItem, 
    ListItemText 
  } from '@mui/material';
  // import { DrawerStyled, DrawerHeaderStyled } from '../../components/layout/Menu/MenuStyled.js';
  import CloseIcon from '@mui/icons-material/Close';
  import { DrawerStyled, DrawerHeaderStyled } from './TrustRelationshipSidePanel.styled.js';
  import AuthContext from '../../store/auth-context.js';
  import { acceptTrustRelationship, declineTrustRelationship } from '../../api/trust_relationships.js';

function TrustRelationshipSidePanel({ open, onClose, rowInfo }) {

  const token = AuthContext.token
const handleAccept = (id) => {
  const res = acceptTrustRelationship({id, token})
  console.log(`Response from Accept ${res}`)
}  

const handleDecline = (id) => {
  const res = declineTrustRelationship(id, token)
  console.log(`Response from Decline ${res}`)
} 

    return (
    <DrawerStyled variant="permanent" open={open} anchor='right' >
       <div style={{ height: '100%', margin: '3rem .4rem', overflowY: 'auto' }}>
        <DrawerHeaderStyled>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeaderStyled>
          
            <Typography variant="h4" sx={{fontWeight:'700', marginLeft: '2rem'}}>Establish Trust</Typography>
            <Typography variant="h4" sx={{fontWeight:'700', marginLeft: '2rem'}}>Relationship</Typography>
  
           <List>
           <ListItem>
            <ListItemText primary="Source Wallet" secondary={rowInfo.actor_wallet ? rowInfo.actor_wallet : '---'} />
          </ListItem>

          <ListItem>
            <ListItemText primary="Target Wallet" secondary={rowInfo.target_wallet ? rowInfo.target_wallet : '---'} />
          </ListItem>

          <ListItem>
            <ListItemText primary="Initiated By" secondary={rowInfo.originating_wallet ? rowInfo.originating_wallet : '---'} />
          </ListItem>

          <ListItem>
            <ListItemText primary="Request Type" secondary= { rowInfo.request_type ? rowInfo.request_type : '---'} />
          </ListItem>
           </List>
  
            <Button variant="contained" color="primary" onClick={() => handleAccept(rowInfo.id)}>
              Accept
            </Button>
            <Button variant="outlined" onClick={() => handleDecline(rowInfo.id)}>
              Decline
            </Button>
            </div>
        </DrawerStyled>
    );
  }

  export default TrustRelationshipSidePanel;