import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import AuthContext from './auth-context';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';

const AuthProvider = (props) => {
  const tokenKey = 'token';
  const walletKey = 'wallet';

  const retrieveToken = () => localStorage.getItem(tokenKey);
  const retrieveWallet = () => JSON.parse(localStorage.getItem(walletKey));

  const [wallet, setWallet] = useState(retrieveWallet);
  const [token, setToken] = useState(retrieveToken);
  const [isLoggedIn, setIsLoggedIn] = useState(wallet && token);
  const navigate = useNavigate();
  const login = (newToken, rememberDetails, newWallet) => {
    if (token === newToken) return;

    setToken(newToken);

    const wallet = newWallet ? newWallet : parseToken(newToken);
    setWallet(wallet);

    localStorage.setItem(walletKey, JSON.stringify(wallet));

    if (rememberDetails) {
      localStorage.setItem(tokenKey, newToken);
    } else {
      localStorage.removeItem(tokenKey);
    }

    setIsLoggedIn(true);
    navigate('/');
  };

  const parseToken = (token) => {
    var decodedWalletInfo = jwt_decode(token);

    return {
      id: decodedWalletInfo.id,
      name: decodedWalletInfo.name,
      logoURL: decodedWalletInfo.logo_url,
      createdAt: decodedWalletInfo.created_at,
      expiration: decodedWalletInfo.expiration,
      about: decodedWalletInfo.about,
    };
  };

  const logout = () => {
    setWallet(undefined);
    setToken(undefined);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(walletKey);
    secureLocalStorage.removeItem('api-key');
    navigate('/login');
  };

  const value = {
    isLoggedIn,
    login,
    logout,
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
