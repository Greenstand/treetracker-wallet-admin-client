import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";
import { session } from "./AuthModel";
import { useNavigate } from "react-router-dom";

const AuthProvider = (props) => {
  const [wallet, setWallet] = useState(undefined);
  const [token, setToken] = useState(undefined);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const login = (newToken, rememberDetails, newWallet) => {
    const currentToken = session.token;
    if (currentToken === newToken) return;

    // update the token in LocalStorage
    session.token = newToken;
    setToken(newToken);

    // wallet is taken from the token
    // todo: decode token and get wallet from it
    const wallet = newWallet ? newWallet : {};
    setWallet(wallet);
    session.wallet = wallet;

    if (rememberDetails) {
      localStorage.setItem("token", JSON.stringify(session.token));
      localStorage.setItem("wallet", JSON.stringify(session.wallet));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("wallet");
    }

    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    setWallet(undefined);
    setToken(undefined);
    localStorage.removeItem("token");
    localStorage.removeItem("wallet");
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

  useEffect(() => {
    if (!wallet || !token) {
      const localToken = JSON.parse(localStorage.getItem("token"));
      const localWallet = JSON.parse(localStorage.getItem("wallet"));

      if (localToken && localWallet) {
        login(localToken, true, localWallet);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
