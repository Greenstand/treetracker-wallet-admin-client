import { CreateNewWallet, DialogText } from './CreateManagedWallet.styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const CreateManagedWallet = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <CreateNewWallet
        type="button"
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
      >
        Create New
      </CreateNewWallet>
      <CreateNewWalletDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  );
};

const CreateNewWalletDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Create Managed Wallet
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <DialogText>
            Please enter the name of the managed wallet to be created. You will
            have complete authority over this wallet.
          </DialogText>
        </DialogContentText>
        <TextField
          autoFocus
          margin="normal"
          id="managed-wallet-name"
          label="Wallet Name"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 16 } }}
          InputLabelProps={{ style: { fontSize: 16 } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateManagedWallet;
