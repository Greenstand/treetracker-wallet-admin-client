import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Wallet from '../../pages/Wallet/Wallet';
import Login from '../../pages/Login/Login';
import Layout from '../layout/Layout';
import AuthContext from '../../store/auth-context';
import SendTokens from '../../pages/SendTokens/SendTokens';
import NotFound from '../../pages/NotFound/NotFound';
import { useContext } from 'react';
import MyTransfers from '../../pages/MyTransfers/MyTransfers';
import { TransfersProvider } from '../../store/TransfersContext';
import MyWallets from '../../pages/MyWallets/MyWallets';
import { WalletsProvider } from '../../store/WalletsContext';
import TrustRelationship from '../../pages/TrustRelationship/TrustRelationship';
import { TrustRelationshipsProvider } from '../../store/TrustRelationshipsContext';
import CustomizeWallet from '../../pages/CustomizeWallet/CustomizeWallet';

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
          <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <Wallet />
              </Layout>
            </TransfersProvider>
          </TrustRelationshipsProvider>
          }
        />
        <Route
          path="/my-transfers"
          exact
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <MyTransfers />
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
        <Route
          path="/send-tokens"
          exact
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <SendTokens />
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
        <Route
          path="/list-wallets"
          exact
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <WalletsProvider>
                  <MyWallets />
                </WalletsProvider>
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
        <Route
          path="/trust-relationship"
          exact
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <TrustRelationship />
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
        <Route
          path="/customize-wallet"
          exact
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <CustomizeWallet />
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
        <Route
          path="*"
          element={
            <TrustRelationshipsProvider>
            <TransfersProvider>
              <Layout>
                <NotFound />
              </Layout>
            </TransfersProvider>
            </TrustRelationshipsProvider>
          }
        />
      </Route>
      <Route path="login" element={<Login />} />
    </Routes>
  );
};

export default ClientRoutes;
