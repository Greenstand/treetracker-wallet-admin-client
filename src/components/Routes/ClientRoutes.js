import { useContext } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../../pages/Login/Login';
import MyTransfers from '../../pages/MyTransfers/MyTransfers';
import NotFound from '../../pages/NotFound/NotFound';
import SendTokens from '../../pages/SendTokens/SendTokens';
import Wallet from '../../pages/Wallet/Wallet';
import AuthContext from '../../store/auth-context';
import Layout from '../layout/Layout';

const ProtectedRoute = ({ isLoggedIn, redirectPath = '/login' }) => {
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
          path="/my-transfers"
          exact
          element={
            <Layout>
              <MyTransfers />
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
