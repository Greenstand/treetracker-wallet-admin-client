/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import styled from '@emotion/styled';
import { Autocomplete, Button, IconButton, TextField } from '@mui/material';
import SelectWallet from './SelectWallet';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';

const SendTokensForm = ({ onSubmit, onCreateWallet, createdWalletName }) => {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  // });

  // const [wallet, setWallet] = useState(null); //wallet && wallet !== filterOptionAll ? wallet.trim() : undefined,

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const [senderWallet, setSenderWallet] = useState(null); //wallet && wallet !== filterOptionAll ? wallet.trim() : undefined,
  const [receiverWallet, setReceiverWallet] = useState(null); //wallet && wallet !== filterOptionAll ? wallet.trim() : undefined,
  // const [tokensAmount, setTokensAmount] = useState(0);
  const tokensAmountRef = useRef(0);
  const createWalletNameRef = useRef(null);
  const [showCreateWallet, setShowCreateWallet] = useState(false);

  const [senderWalletSearchString, setSenderWalletSearchString] = useState('');
  const [receiverWalletSearchString, setReceiverWalletSearchString] =
    useState('');

  useEffect(() => {
    console.log('SendTokensForm.js rendered');
  }, []);

  const handleChangeSenderWallet = useCallback((value) => {
    setSenderWallet(value);
  }, []);

  const handleChangeReceiverWallet = useCallback((value) => {
    setReceiverWallet(value);
  }, []);

  const handleCreateWallet = () => {
    onCreateWallet(createWalletNameRef.current.value);

    setShowCreateWallet(false);
  };

  const handleSubmit = (e) => {
    debugger;
    e.preventDefault();
    // Do something with the form data
    //console.log(formData);

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

  const StyledFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 20rem;
    margin: 2rem;
  `;

  const FormRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
  `;

  const StyledButton = styled(Button)`
    width: fit-content; /* Adjust the width of the button based on content */
  `;

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

  return (
    <StyledFormContainer onSubmit={handleSubmit}>
      senderWallet: {senderWallet}
      receiverWallet: {receiverWallet}
      tokensAmount: {tokensAmountRef.current?.value}
      managedWallet: {createWalletNameRef.current?.value}
      createdWalletName: {createdWalletName}
      <FormRow>
        <SelectWallet
          // classes={classes}
          wallet={senderWallet}
          handleChangeWallet={handleChangeSenderWallet}
          label={'Sender Wallet'}
          // walletSearchString={senderWalletSearchString}
          // handleChangeWalletSearchString={(value) => {
          //   setSenderWalletSearchString(value);
          // }}
        />
      </FormRow>
      <FormRow style={{ display: 'flex' }}>
        {/* <SelectWallet
          // classes={classes}

          wallet={receiverWallet}
          handleChangeWallet={handleChangeReceiverWallet}
          label={'Receiver Wallet'}
          createdWalletName={createdWalletName}

          // walletSearchString={receiverWalletSearchString}
          // handleChangeWalletSearchString={(value) => {
          //   setReceiverWallet(value);
          // }}
        /> */}
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <a
          onClick={() => setShowCreateWallet(true)}
          style={{ color: 'green', cursor: 'pointer', marginLeft: '1rem' }}
        >
          + Create Managed Wallet
        </a>
      </FormRow>
      {showCreateWallet && (
        <FormRow>
          <TextField
            id="outlined-text"
            label="Managed Wallet Name"
            type="text"
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={createWalletNameRef}
          />
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={handleCreateWallet}
          >
            <AddCircleIcon fontSize="large" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => setShowCreateWallet(false)}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </FormRow>
      )}
      <FormRow>
        <TextField
          id="outlined-number"
          label="Token Amount"
          type="number"
          InputProps={{ inputProps: { min: 1, max: 1000 } }}
          defaultValue={1}
          inputRef={tokensAmountRef}
        />
      </FormRow>
      <FormRow>
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={showCreateWallet}
        >
          Submit
        </StyledButton>
      </FormRow>
    </StyledFormContainer>
  );
};

export default React.memo(SendTokensForm);
