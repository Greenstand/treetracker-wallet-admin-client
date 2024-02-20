import {
  CreateButton,
  CreateNewWallet,
  CreateSuccessIcon,
  CreateSuccessText,
} from './CreateManagedWallet.styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createWallet } from '../../../api/wallets';
import AuthContext from '../../../store/auth-context';

const CreateManagedWallet = ({ loadData }) => {
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
      />
    </>
  );
};

const CreateNewWalletDialog = ({ open, handleClose, loadData }) => {
  const [walletName, setWalletName] = useState('');
  const [createWalletError, setCreateWalletError] = useState(false);
  const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState('');
  const [createSuccess, setCreateSuccess] = useState(false);

  const authContext = useContext(AuthContext);

  const closeDialog = () => {
    setCreateWalletError(false);
    setCreateWalletErrorMessage('');
    setWalletName('');
    handleClose();
    setCreateSuccess(false);
  };

  const handleTextChange = (event) => {
    setWalletName(event.target.value);
  };

  const setWalletError = (errorMessage) => {
    setCreateWalletError(true);
    setCreateWalletErrorMessage(errorMessage);
  };

  const validateCreateWallet = (wallet) => {
    if (!wallet) {
      setWalletError('Wallet name is required');
      return false;
    }

    if (wallet.length < 3) {
      setWalletError('Wallet name must be at least 3 characters long');
      return false;
    }

    const pattern = /^[a-zA-Z0-9\-.@]+$/;
    if (!pattern.test(wallet)) {
      setWalletError(
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
      setCreateSuccess(true);
      setWalletName('');
      loadData();
    } catch (error) {
      console.error(error);
      setCreateWalletError(true);
      setCreateWalletErrorMessage(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth={true} maxWidth={'xs'}>
      <DialogTitle>
        {!createSuccess && 'Create Managed Wallet'}
        <IconButton
          aria-label="close"
          onClick={closeDialog}
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
        {!createSuccess ? (
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
            value={walletName}
          />
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CreateSuccessIcon />
            <CreateSuccessText>Wallet created successfully</CreateSuccessText>
          </div>
        )}
      </DialogContent>
      {!createSuccess && (
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
      )}
    </Dialog>
  );
};

export default CreateManagedWallet;
