import React from "react";
import { Routes, Route } from "react-router-dom";
import Wallet from "../../pages/Wallet/Wallet";
import Page1 from "../../pages/Page1/Page1";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Wallet />} />
      <Route path="/page1" exact element={<Page1 />} />
    </Routes>
  );
};

export default ClientRoutes;
