import React from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  return (
    <AuthContext.Provider value={{ isLoggedIn: false }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
