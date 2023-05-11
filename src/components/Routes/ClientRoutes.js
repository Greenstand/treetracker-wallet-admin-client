import React from "react";
import { Routes, Route } from "react-router-dom";
import Wallet from "../../pages/Wallet/Wallet";
import TransferStatus from "../../pages/TransferStatus/TransferStatus";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Wallet />} />
      <Route path="/transfer-status" exact element={<TransferStatus />} />
    </Routes>
  );
};

export default ClientRoutes;
