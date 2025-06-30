import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import SelectWallet from './SelectWallet';
import { StyledBox, StyledButton } from './SendTokensFormStyled';
import ConfirmDialog from './confirmDialog/ConfirmDialog';

const SendToUntrustedWalletsForm = (props) => {
  const {
    onSubmit,
    onSenderWalletSelected,
    availableTokens = 0,
  } = props;

  const [senderWallet, setSenderWallet] = useState(null);
  const [receiverWallet, setReceiverWallet] = useState('');
  const tokensAmountRef = useRef(0);
  const [isSubmitBtnDisabled, setIsSubmitButtonDisabled] = useState(true);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const [tokenAmountError, setTokenAmountError] = useState(false);
  const [tokenAmountErrorMessage, setTokenAmountErrorMessage] = useState('');

  useEffect(() => {
    isSubmitButtonDisabled();
  }, [receiverWallet, senderWallet, tokenAmountError]);

  // Re-validate token amount when available tokens change
  useEffect(() => {
    if (tokensAmountRef.current && tokensAmountRef.current.value > 0) {
      validateTokenAmount(tokensAmountRef.current.value);
    }
  }, [availableTokens]);

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

  const validateTokenAmount = (amount) => {
    const numAmount = parseFloat(amount);
    
    if (!senderWallet) {
      setTokenAmountError(false);
      setTokenAmountErrorMessage('');
      return true;
    }

    if (numAmount <= 0) {
      setTokenAmountError(true);
      setTokenAmountErrorMessage('Token amount must be greater than 0');
      return false;
    }

    if (numAmount > availableTokens) {
      setTokenAmountError(true);
      setTokenAmountErrorMessage(
        `Cannot send ${numAmount.toLocaleString()} tokens. Available: ${availableTokens.toLocaleString()}`
      );
      return false;
    }

    setTokenAmountError(false);
    setTokenAmountErrorMessage('');
    return true;
  };

  const handleTokenAmountChange = () => {
    const amount = tokensAmountRef.current.value;
    validateTokenAmount(amount);
    isSubmitButtonDisabled();
  };

  const handleChangeSenderWallet = useCallback((wallet) => {
    if (!wallet) {
      setSenderWallet(null);
      onSenderWalletSelected(null);
      setTokenAmountError(false);
      setTokenAmountErrorMessage('');
      return;
    }

    setSenderWallet(wallet.name);
    onSenderWalletSelected(wallet);

    // Validate current token amount against available tokens
    if (tokensAmountRef.current.value > 0) {
      validateTokenAmount(tokensAmountRef.current.value);
    }
  }, [availableTokens]);

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
      tokensAmountRef.current.value <= 0 ||
      tokenAmountError;
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
                InputProps={{ 
                  inputProps: { 
                    min: 0, 
                    max: Math.max(availableTokens, 0),
                    step: 1
                  } 
                }}
                defaultValue={1}
                inputRef={tokensAmountRef}
                onChange={handleTokenAmountChange}
                error={tokenAmountError}
                helperText={tokenAmountError ? tokenAmountErrorMessage : `Available: ${availableTokens.toLocaleString()} tokens`}
                disabled={!senderWallet}
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