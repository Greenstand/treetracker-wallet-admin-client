import {
  CreateButton,
  CreateNewWallet,
  DialogText,
} from './CreateManagedWallet.styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createWallet } from '../../api/wallets';
import AuthContext from '../../store/auth-context';

const CreateManagedWallet = ({ loadData, setMessage }) => {
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
        Create Managed Wallet
      </CreateNewWallet>
      <CreateNewWalletDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        loadData={loadData}
        setMessage={setMessage}
      />
    </>
  );
};

const CreateNewWalletDialog = ({ open, handleClose, loadData, setMessage }) => {
  const [walletName, setWalletName] = useState('');
  const [createWalletError, setCreateWalletError] = useState(false);
  const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState('');

  const authContext = useContext(AuthContext);

  const closeDialog = () => {
    setCreateWalletError(false);
    setCreateWalletErrorMessage('');
    handleClose();
  };

  const handleTextChange = (event) => {
    setWalletName(event.target.value);
  };

  const validateCreateWallet = (wallet) => {
    if (!wallet) {
      setCreateWalletError(true);
      setCreateWalletErrorMessage('Wallet name is required');
      return false;
    }

    const pattern = /^[a-zA-Z0-9\-.@]+$/;
    if (!pattern.test(wallet)) {
      setCreateWalletError(true);
      setCreateWalletErrorMessage(
        'Wallet can only contain numbers, letters and the - . @ symbols'
      );
      return false;
    }

    return true;
  };

  const handleCreateWallet = async () => {
    if (!validateCreateWallet(walletName)) {
      return;
    }
    try {
      const createdWallet = await createWallet(authContext.token, walletName);
      console.log(createdWallet);
      setMessage(
        `Wallet with name ${createdWallet.wallet} successfully created`
      );
      loadData();
    } catch (error) {
      console.error(error);
      setMessage(error);
    }

    setWalletName('');
    closeDialog();
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
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
          onChange={handleTextChange}
          error={createWalletError}
          helperText={createWalletErrorMessage}
        />
      </DialogContent>
      <DialogActions
        style={{ justifyContent: 'center', paddingBottom: '1.5em' }}
      >
        <Button onClick={closeDialog}>Cancel</Button>
        <CreateButton
          type="button"
          variant="contained"
          color="primary"
          onClick={handleCreateWallet}
        >
          Create
        </CreateButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateManagedWallet;
