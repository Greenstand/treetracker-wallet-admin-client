import React from "react";
import { Routes, Route } from "react-router-dom";
import Wallet from "../../pages/Wallet/Wallet";
import TransferStatus from "../../pages/TransferStatus/TransferStatus";
import SendTokens from '../../pages/SendTokens/SendTokens';
import NotFound from "../../pages/NotFound/NotFound";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={<Wallet />}
      />
      <Route
        path="/transfer-status"
        exact
        element={<TransferStatus />}
      />
      <Route
        path="/send-tokens"
        exact
        element={<SendTokens />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default ClientRoutes;
