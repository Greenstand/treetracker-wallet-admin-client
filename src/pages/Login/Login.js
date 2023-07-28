import {
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import React, { useContext, useState } from 'react';
import {
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledTypography,
} from './Login.style';
import AuthContext from '../../store/auth-context';
import apiClient from '../../utils/apiClient';
import IconLogo from '../../components/UI/IconLogo';
import { validatePassword, validateWallet } from './loginValidator';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { FlexDiv } from '../../components/UI/styledComponents/CommonStyled';
import { Loader } from '../../components/UI/components/Loader/Loader';
import Message from '../../components/UI/components/Message/Message';
import { MessageType } from '../../components/UI/components/Message/Message';

const LOGIN_API = `${process.env.REACT_APP_WALLET_API_ROOT}/auth`;

const Login = () => {
  const [wallet, setWallet] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRemember, setRemember] = useState(true);
  const [walletError, setWalletError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const authContext = useContext(AuthContext);

  const handleWalletBlur = (value) =>
    value ? validateWalletInput(wallet) : setWalletError('');

  const handlePasswordBlur = (value) =>
    value ? validatePasswordInput(password) : setPasswordError('');

  const validateWalletInput = (value) => {
    const error = validateWallet(value);
    setWalletError(error);
  };

  const validatePasswordInput = (value) => {
    const error = validatePassword(value);
    setPasswordError(error);
  };

  const handleWalletChange = (event) => {
    setWallet(event.target.value);
    validateWalletInput(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePasswordInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (wallet && password) {
      login();
    }
    return false;
  };

  const login = () => {
    setIsLoading(true);

    apiClient
      .post(LOGIN_API, {
        wallet,
        password,
      })
      .then((response) => {
        if (response.status === 200) {
          const token = response.data.token;
          authContext.login(token, isRemember);
        } else {
          setErrorMessage('Invalid wallet or password');
        }
      })
      .catch((error) => {
        console.error('Undefined Wallet error:', error);
        setErrorMessage(
          error.response?.data?.errorMessage ||
            'Could not log in. Please check your wallet and password or contact the admin.'
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <FlexDiv flexDirection="column">
          <IconLogo />
          <Box m={2} />
          <Typography variant="h3">Wallet Admin Panel</Typography>
        </FlexDiv>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="wallet"
            label="Wallet"
            name="wallet"
            autoComplete="wallet"
            onFocus={() => handleWalletBlur(false)}
            onBlur={() => handleWalletBlur(true)}
            helperText={walletError}
            error={!!walletError}
            onChange={handleWalletChange}
            value={wallet}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onFocus={() => handlePasswordBlur(false)}
            onBlur={() => handlePasswordBlur(true)}
            helperText={passwordError}
            error={!!passwordError}
            onChange={handlePasswordChange}
            value={password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                    name='password visibility'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid container justifyContent="space-between">
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={isRemember}
                    onClick={() => setRemember(!isRemember)}
                    value="remember"
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //Disable button if sending request, wallet or password are empty
            disabled={isLoading || !wallet || !password}
          >
            <StyledTypography>LOG IN</StyledTypography>
          </StyledButton>
          {isLoading && (
            <FlexDiv>
              <Loader />
            </FlexDiv>
          )}
          {errorMessage && (
            <Message
              message={errorMessage}
              onClose={() => setErrorMessage('')}
              messageType={MessageType.ERROR}
            />
          )}
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Login;
