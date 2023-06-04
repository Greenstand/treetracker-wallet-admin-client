import { Box, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  StyledBox,
  StyledButton,
  StyledContainer,
  StyledForm,
  StyledTypography,
} from "./Login.style";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("submit");
  };

  function handleUsernameChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  // todo: if user is logged in, redirect to home page
  return (
    <StyledContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        {/* <IconLogo /> */}
        <Box m={2} />
        <Typography variant="h2">Admin Panel</Typography>
        <StyledForm onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="userName"
            onChange={handleUsernameChange}
            value={userName}
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
            onChange={handlePasswordChange}
            value={password}
          />
          <Grid container justifyContent="space-between">
            <Grid item>
              <StyledBox>
                <Link href="/reset_password" variant="body2">
                  Forgot password?
                </Link>
              </StyledBox>
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <StyledTypography>LOG IN</StyledTypography>
          </StyledButton>
        </StyledForm>
      </div>
    </StyledContainer>
  );
};

export default Login;
