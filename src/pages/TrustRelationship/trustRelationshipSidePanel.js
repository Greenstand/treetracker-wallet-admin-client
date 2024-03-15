import {
    Typography,
    Button, 
    IconButton,
    List, 
    ListItem, 
    ListItemText 
  } from '@mui/material';
  import { DrawerStyled, DrawerHeaderStyled } from '../../components/layout/Menu/MenuStyled.js';
  import CloseIcon from '@mui/icons-material/Close';

function TrustRelationshipSidePanel({ open, onClose }) {
    return (
    <DrawerStyled variant="permanent" open={open} anchor="right" sx={{ zIndex: 10 }}>
        <DrawerHeaderStyled>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeaderStyled>
          
            <Typography variant="h4" sx={{fontWeight:'700', marginLeft: '2rem'}}>Establish Trust</Typography>
            <Typography variant="h4" sx={{fontWeight:'700', marginLeft: '2rem'}}>Relationship</Typography>
  
           <List>
           <ListItem>
            <ListItemText primary="Source Wallet" secondary="WalletZ" />
          </ListItem>

          <ListItem>
            <ListItemText primary="Target Wallet" secondary="WalletX" />
          </ListItem>

          <ListItem>
            <ListItemText primary="Initiated By" secondary="WalletX" />
          </ListItem>

          <ListItem>
            <ListItemText primary="Request Type" secondary="Send" />
          </ListItem>
           </List>
  
            <Button variant="contained" color="primary">
              Accept
            </Button>
            <Button variant="outlined">
              Decline
            </Button>
        </DrawerStyled>
    );
  }

  export default TrustRelationshipSidePanel;