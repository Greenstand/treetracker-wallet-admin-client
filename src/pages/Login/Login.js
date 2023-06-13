import {
  Alert,
  Box,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import {
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledTypography,
} from "./Login.style";
import AuthContext from "../../store/auth-context";
import apiClient from "../../utils/apiClient";
import IconLogo from "../../components/UI/IconLogo";

const LOGIN_API = `${process.env.REACT_APP_WALLET_API_ROOT}/auth`;

const Login = () => {
  const [wallet, setWallet] = useState("");
  const [password, setPassword] = useState("");
  const [walletBlurred, setWalletBlurred] = useState(false);
  const [passwordBlurred, setPasswordBlurred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRemember, setRemember] = useState(true);

  const authContext = useContext(AuthContext);

  const isWalletBlank = () => walletBlurred && wallet === "";
  const isPasswordBlank = () => passwordBlurred && password === "";

  const handleWalletBlur = (value) => setWalletBlurred(value);
  const handlePasswordBlur = (value) => setPasswordBlurred(value);
  const handleWalletChange = (event) => setWallet(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    setWalletBlurred(true);
    setPasswordBlurred(true);

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
          setErrorMessage("Invalid wallet or password");
        }
      })
      .catch((error) => {
        console.error("Undefined Wallet error:", error);
        setErrorMessage(
          error.response?.data?.errorMessage ||
            "Could not log in. Please check your wallet and password or contact the admin."
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
        <IconLogo />
        <Box m={2} />
        <Typography variant="h2">Admin Panel</Typography>
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
            helperText={isWalletBlank() ? "Wallet is required" : ""}
            error={isWalletBlank()}
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
            type="password"
            id="password"
            autoComplete="current-password"
            onFocus={() => handlePasswordBlur(false)}
            onBlur={() => handlePasswordBlur(true)}
            helperText={isPasswordBlank() ? "Password is required" : ""}
            error={isPasswordBlank()}
            onChange={handlePasswordChange}
            value={password}
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
            //Disable button if sending request, username or password are empty
            disabled={isLoading || !wallet || !password}
          >
            <StyledTypography>LOG IN</StyledTypography>
          </StyledButton>
          {errorMessage && (
            <div style={{ display: "inline-block", minWidth: "35%" }}>
              <Alert severity="error" onClose={() => setErrorMessage("")}>
                {errorMessage}
              </Alert>
            </div>
          )}
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Login;
