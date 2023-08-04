import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Wallet from "../../pages/Wallet/Wallet";
import TransferStatus from "../../pages/TransferStatus/TransferStatus";
import Login from "../../pages/Login/Login";
import Layout from "../layout/Layout";
import AuthContext from "../../store/auth-context";
import SendTokens from "../../pages/SendTokens/SendTokens";
import NotFound from "../../pages/NotFound/NotFound";
import { useContext } from "react";

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/login" }) => {
  if (!isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

const ClientRoutes = () => {
  const authCtx = useContext(AuthContext);

  return (
    <Routes>
      <Route element={<ProtectedRoute isLoggedIn={authCtx.isLoggedIn} />}>
        <Route
          path="/"
          exact
          element={
            <Layout>
              <Wallet />
            </Layout>
          }
        />
        <Route
          path="/transfer-status"
          exact
          element={
            <Layout>
              <TransferStatus />
            </Layout>
          }
        />
        <Route
          path="/send-tokens"
          exact
          element={
            <Layout>
              <SendTokens />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <NotFound />
            </Layout>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default ClientRoutes;
