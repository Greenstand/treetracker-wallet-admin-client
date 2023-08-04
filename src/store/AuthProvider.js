import React, { useState } from "react";
import AuthContext from "./auth-context";
import { useNavigate } from "react-router-dom";

const AuthProvider = (props) => {
  const tokenKey = "token";
  const walletKey = "wallet";

  const retrieveToken = () => JSON.parse(localStorage.getItem(tokenKey));
  const retrieveWallet = () => JSON.parse(localStorage.getItem(walletKey));

  const [wallet, setWallet] = useState(retrieveWallet);
  const [token, setToken] = useState(retrieveToken);
  const [isLoggedIn, setIsLoggedIn] = useState(wallet && token);
  const navigate = useNavigate();

  const login = (newToken, rememberDetails, newWallet) => {
    if (token === newToken) return;

    setToken(newToken);

    // wallet is taken from the token
    // todo: decode token and get wallet from it
    const wallet = newWallet ? newWallet : {};
    setWallet(wallet);

    if (rememberDetails) {
      localStorage.setItem(tokenKey, JSON.stringify(newToken));
      localStorage.setItem(walletKey, JSON.stringify(wallet));
    } else {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(walletKey);
    }

    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    setWallet(undefined);
    setToken(undefined);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(walletKey);
    navigate("/login");
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    // TODO: wallet info will be filled from Token (after token is decoded)
    wallet,
    token,
    ...props.value,
  };

  if (!wallet || !token) {
    const localToken = JSON.parse(localStorage.getItem(tokenKey));
    const localWallet = JSON.parse(localStorage.getItem(walletKey));

    if (localToken && localWallet) {
      login(localToken, true, localWallet);
    }
  }

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
