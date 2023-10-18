import { createContext } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  token: "",
  wallet: {},
  login: () => {},
  logout: () => {},
});

export default AuthContext;
