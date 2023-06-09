import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SendTokens from '../../pages/SendTokens/SendTokens';
import TransferStatus from '../../pages/TransferStatus/TransferStatus';
import Wallet from '../../pages/Wallet/Wallet';

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
		</Routes>
	);
};

export default ClientRoutes;
