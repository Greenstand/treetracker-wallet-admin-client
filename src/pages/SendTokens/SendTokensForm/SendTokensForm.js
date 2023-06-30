import React, { useState } from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
import SelectWallet from "./SelectWallet";

const SendTokensForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [wallet, setWallet] = useState(null); //wallet && wallet !== filterOptionAll ? wallet.trim() : undefined,

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the form data
    console.log(formData);
  };

  const StyledFormContainer = styled.div`
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

  const StyledLabel = styled.label`
    width: 10rem;
  `;

  const StyledInput = styled.input`
    flex: 1;
    padding: 5px;
  `;

  const SubmitButton = styled(Button)`
    width: fit-content; /* Adjust the width of the button based on content */
  `;

  return (
    <StyledFormContainer onSubmit={handleSubmit}>
      <FormRow>
        <StyledLabel htmlFor="name">Send from Wallet</StyledLabel>
        <SelectWallet
          // classes={classes}
          wallet={wallet}
          handleChangeWallet={(value) => {
            setWallet(value);
          }}
        />
      </FormRow>
      <FormRow>
        <StyledLabel htmlFor="name">Send to Wallet</StyledLabel>
        <StyledInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <StyledLabel htmlFor="name">Amount of tokens</StyledLabel>
        <StyledInput
          type="number"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
      </FormRow>
      <FormRow>
        <SubmitButton type="submit" variant="contained" color="primary">
          Submit
        </SubmitButton>
      </FormRow>
    </StyledFormContainer>
  );
};

export default SendTokensForm;
