import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import SelectWallet from './SelectWallet';
import { StyledBox, StyledButton } from './SendTokensFormStyled';
import ConfirmDialog from './confirmDialog/ConfirmDialog';

const SendToUntrustedWalletsForm = (props) => {
  const {
    onSubmit,
    onSenderWalletSelected,
  } = props;

  const [senderWallet, setSenderWallet] = useState(null);
  const [receiverWallet, setReceiverWallet] = useState('');
  const tokensAmountRef = useRef(0);
  const [isSubmitBtnDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  useEffect(() => {
    isSubmitButtonDisabled();
  }, [receiverWallet, senderWallet]);

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
    if (!wallet) {
      setSenderWallet(null);
      onSenderWalletSelected(null);
      return;
    }

    setSenderWallet(wallet.name);
    onSenderWalletSelected(wallet);

    if (tokensAmountRef.current.value > wallet.tokensInWallet) {
      tokensAmountRef.current.value = wallet.tokensInWallet;
    }
    tokensAmountRef.current.setAttribute('max', wallet.tokensInWallet);
  }, []);

  const handleReceiverWalletChange = (e) => {
    setReceiverWallet(e.target.value);
  };

  const handleSubmit = () => {
    const tokensAmount = tokensAmountRef.current.value;

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
              <TextField
                label="Receiver Wallet Address"
                value={receiverWallet}
                onChange={handleReceiverWalletChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={6}></Grid>
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

export default React.memo(SendToUntrustedWalletsForm);