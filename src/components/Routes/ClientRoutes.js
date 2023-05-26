import React, { useContext } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Wallet from "../../pages/Wallet/Wallet";
import TransferStatus from "../../pages/TransferStatus/TransferStatus";
import Login from "../../pages/Login/Login";
import Layout from "../layout/Layout";
import AuthContext from "../../store/auth-context";

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
          element={
            <Layout>
              <Wallet />
            </Layout>
          }
        />
        <Route
          path="/transfer-status"
          element={
            <Layout>
              <TransferStatus />
            </Layout>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
      {/* TODO: create a 404 page */}
      <Route path="*" element={<p>There is nothing here: 404!</p>} />
    </Routes>
  );
};

export default ClientRoutes;
