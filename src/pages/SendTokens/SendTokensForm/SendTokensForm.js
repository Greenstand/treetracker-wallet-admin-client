import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import SelectWallet from './SelectWallet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import { StyledBox, StyledButton } from './SendTokensFormStyled';
import ConfirmDialog from './confirmDialog/ConfirmDialog';

const SendTokensForm = (props) => {
  const {
    onSubmit,
    onCreateWallet,
    createdWalletName,
    onSenderWalletSelected,
  } = props;

  // name of the wallet
  const [senderWallet, setSenderWallet] = useState(null);
  const [receiverWallet, setReceiverWallet] = useState(null);
  const tokensAmountRef = useRef(0);
  const createWalletNameRef = useRef(null);
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  const [createWalletError, setCreateWalletError] = useState(false);
  const [createWalletErrorMessage, setCreateWalletErrorMessage] = useState('');

  const [isSubmitBtnDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    isSubmitButtonDisabled();
  }, [receiverWallet, senderWallet, showCreateWallet]);

  const handleConfirmationDialogOpen = e => {
    e.preventDefault();
    setShowConfirmationDialog(true);
  };

  const handleConfirmationDialogClose = () => {
    setShowConfirmationDialog(false);
  };

  const handleConfirmSubmit = () => {
    handleSubmit();
    handleConfirmationDialogClose();
  };

  const handleChangeSenderWallet = useCallback((wallet) => {
    // sender wallet is not selected / was deselected
    if (!wallet) {
      setSenderWallet(null);
      onSenderWalletSelected(null);
      return;
    }

    setSenderWallet(wallet.name);
    onSenderWalletSelected(wallet);

    // it should not be possible to send more tokens than there are in the wallet
    if (tokensAmountRef.current.value > wallet.tokensInWallet) {
      tokensAmountRef.current.value = wallet.tokensInWallet;
    }
    tokensAmountRef.current.setAttribute('max', wallet.tokensInWallet);
  }, []);

  const handleChangeReceiverWallet = useCallback((wallet) => {
    if (!wallet) {
      setReceiverWallet(null);
      return;
    }

    setReceiverWallet(wallet.name);
  }, []);

  const handleCreateWallet = () => {
    if (!validateCreateWallet(createWalletNameRef.current.value)) {
      return;
    }

    onCreateWallet(createWalletNameRef.current.value);
    setCreateWalletError(false);
    setShowCreateWallet(false);
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

  const handleSubmit = () => {

    const tokensAmount = tokensAmountRef.current.value;

    console.log('tokensAmount:', tokensAmount);

    onSubmit({
      senderWallet,
      receiverWallet,
      tokensAmount,
    });

    // reset form
    tokensAmountRef.current.value = 1;
  };

  const isSubmitButtonDisabled = () => {
    const isDisabled =
      !senderWallet ||
      !receiverWallet ||
      showCreateWallet ||
      tokensAmountRef.current.value <= 0;
    setIsSubmitButtonDisabled(isDisabled);
  };

  return (
    <>
      <StyledBox>
        <form onSubmit={handleConfirmationDialogOpen}>
          <Grid container spacing={8}>
            <Grid item xs={6}>
              <SelectWallet
                wallet={senderWallet}
                onChangeWallet={handleChangeSenderWallet}
                label={'Sender Wallet'}
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <SelectWallet
                wallet={receiverWallet}
                onChangeWallet={handleChangeReceiverWallet}
                label={'Receiver Wallet'}
                createdWalletName={createdWalletName}
              />
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <a
                onClick={() => setShowCreateWallet(true)}
                style={{
                  color: 'green',
                  cursor: 'pointer',
                  marginLeft: '1rem',
                }}
              >
                + Create Managed Wallet
              </a>
            </Grid>
            <Grid item xs={2}></Grid>

            {showCreateWallet && (
              <>
                <Grid item xs={4}>
                  <TextField
                    id="wallet-name"
                    label="Managed Wallet Name"
                    type="text"
                    required
                    error={createWalletError}
                    helperText={createWalletErrorMessage}
                    sx={{ width: '100%' }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      setCreateWalletError(!event.target.value)
                    }
                    inputRef={createWalletNameRef}
                  />
                </Grid>
                <Grid item xs={1}>
                  {/* Create wallet */}
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={handleCreateWallet}
                  >
                    <AddCircleIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={1}>
                  {/* Cancel creating wallet */}
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      setShowCreateWallet(false);
                      setCreateWalletError(false);
                    }}
                  >
                    <CloseIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={6}></Grid>
              </>
            )}
            <Grid item xs={12}>
              <TextField
                id="token-amount"
                label="Token Amount"
                type="number"
                InputProps={{ inputProps: { min: 0, max: 10000 } }}
                defaultValue={1}
                inputRef={tokensAmountRef}
                onChange={() => isSubmitButtonDisabled()}
              />
            </Grid>
            <Grid item xs={12}>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitBtnDisabled}
              >
                Submit
              </StyledButton>
            </Grid>
          </Grid>
        </form>
      </StyledBox>
      <ConfirmDialog
        open={showConfirmationDialog}
        onClose={handleConfirmationDialogClose}
        onConfirm={handleConfirmSubmit}
        senderWallet={senderWallet}
        receiverWallet={receiverWallet}
        tokensAmount={tokensAmountRef}

      />
    </>
  );
};

export default React.memo(SendTokensForm);
