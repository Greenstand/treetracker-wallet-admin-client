import React, { useCallback, useContext, useState } from 'react';
import {
  CreateNewRelationship,
  CreateSuccessIcon,
} from './CreateTrustRelationship.styled';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContent from '@mui/material/DialogContent';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import {
  CreateButton,
  CreateSuccessText,
} from '../../MyWallets/CreateManagedWallet/CreateManagedWallet.styled';
import DialogActions from '@mui/material/DialogActions';
import SelectWallet from '../../SendTokens/SendTokensForm/SelectWallet';
import { ArrowDropDown } from '@mui/icons-material';
import AuthContext from '../../../store/auth-context';
import { requestTrustRelationship } from '../../../api/trustRelationships';
import Message from '../../../components/UI/components/Message/Message';
import { useTrustRelationshipsContext } from '../../../store/TrustRelationshipsContext';

const trustRequestTypeList = [
  {
    label: 'Send',
    value: 'send',
  },
  {
    label: 'Deduct',
    value: 'deduct',
  },
  {
    label: 'Manage',
    value: 'manage',
  },
];

const CreateTrustRelationship = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <CreateNewRelationship
        type="button"
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
      >
        + Create
      </CreateNewRelationship>
      <CreateNewRelationshipDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
      />
    </>
  );
};

const CreateNewRelationshipDialog = ({ open, handleClose }) => {
  const initialFields = {
    requestType: '',
    requestingWallet: '',
    targetWallet: '',
  };

  const [formFields, setFormFields] = useState(initialFields);
  const [formFieldErrors, setFormFieldErrors] = useState(initialFields);

  const [requestSuccess, setRequestSuccess] = useState(false);
  const [sendRequestError, setSendRequestError] = useState('');

  const authContext = useContext(AuthContext);
  const { loadData } = useTrustRelationshipsContext();

  const closeDialog = () => {
    setRequestSuccess(false);
    resetFields();
    setSendRequestError('');
    handleClose();
  };

  const resetFields = () => {
    setFormFields(initialFields);
    setFormFieldErrors(initialFields);
  };

  const handleChangeRequestingWallet = useCallback((wallet) => {
    setFormFields((prevState) => ({
      ...prevState,
      requestingWallet: !wallet ? initialFields.requestingWallet : wallet.name,
    }));
  }, []);

  // TODO refactor this function in CreateManagedWallet and SendTokensForm as well
  const validateCreateWallet = (walletName) => {
    if (!walletName) {
      return 'Wallet name is required';
    }

    if (walletName.length < 3) {
      return 'Wallet name must be at least 3 characters long';
    }

    const pattern = /^[a-zA-Z0-9\-.@]+$/;
    if (!pattern.test(walletName)) {
      return 'Wallet can only contain numbers, letters and the - . @ symbols';
    }

    return '';
  };

  const validateFields = () => {
    let fieldErrors = { ...initialFields };

    const targetWalletError = validateCreateWallet(formFields.targetWallet);

    fieldErrors.requestType = !formFields.requestType
      ? 'Request Type is required'
      : '';
    fieldErrors.requestingWallet = !formFields.requestingWallet
      ? 'Requesting Wallet is required'
      : '';
    fieldErrors.targetWallet = targetWalletError;

    return fieldErrors;
  };

  const handleSendRequest = async () => {
    const validationErrors = validateFields();

    const hasErrors = !!(
      validationErrors.requestingWallet ||
      validationErrors.requestType ||
      validationErrors.targetWallet
    );

    if (hasErrors) {
      setFormFieldErrors(validationErrors);
      return;
    }

    try {
      const trustRelationshipRequest = await requestTrustRelationship(
        authContext.token,
        formFields
      );
      console.log(trustRelationshipRequest);
      setRequestSuccess(true);
      resetFields();
      loadData();
    } catch (error) {
      console.log(error);
      setSendRequestError(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>
        {!requestSuccess && 'Request Trust Relationship'}
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
        {sendRequestError && (
          <Message
            message={sendRequestError}
            onClose={() => setSendRequestError('')}
          />
        )}
        {!requestSuccess ? (
          <Grid container spacing={8} sx={{ marginTop: '0.25em' }}>
            <Grid item xs={8}>
              <FormControl fullWidth error={!!formFieldErrors.requestType}>
                <InputLabel id="trust-request-type">
                  Trust Request Type
                </InputLabel>
                <Select
                  displayEmpty
                  value={formFields.requestType}
                  onChange={(event) =>
                    setFormFields((prevState) => ({
                      ...prevState,
                      requestType: event.target.value,
                    }))
                  }
                  IconComponent={ArrowDropDown}
                  label={'Trust Request Type'}
                >
                  {trustRequestTypeList.map((type, index) => {
                    return (
                      <MenuItem key={index} value={type.value}>
                        {type.label}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText>{formFieldErrors.requestType}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <SelectWallet
                wallet={formFields.requestingWallet}
                onChangeWallet={handleChangeRequestingWallet}
                label={'Requesting Wallet'}
                isError={!!formFieldErrors.requestingWallet}
                errorMessage={formFieldErrors.requestingWallet}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="target-wallet-name"
                label="Target Wallet"
                fullWidth
                variant="outlined"
                inputProps={{ style: { fontSize: 14 } }}
                InputLabelProps={{ style: { fontSize: 14 } }}
                onChange={(event) =>
                  setFormFields((prevState) => ({
                    ...prevState,
                    targetWallet: event.target.value,
                  }))
                }
                error={!!formFieldErrors.targetWallet}
                helperText={formFieldErrors.targetWallet}
                value={formFields.targetWallet}
              />
            </Grid>
          </Grid>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <CreateSuccessIcon />
            <CreateSuccessText>
              Trust request sent successfully
            </CreateSuccessText>
          </div>
        )}
      </DialogContent>
      {!requestSuccess && (
        <DialogActions
          style={{
            justifyContent: 'center',
            paddingBottom: '1.5em',
          }}
        >
          <Button onClick={closeDialog}>Cancel</Button>
          <CreateButton
            type="button"
            variant="contained"
            color="primary"
            onClick={handleSendRequest}
          >
            Request
          </CreateButton>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default CreateTrustRelationship;
