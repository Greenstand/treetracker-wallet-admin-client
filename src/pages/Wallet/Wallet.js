import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid } from '@mui/material';
import WalletInfoBlock from './WalletInfoBlock/WalletInfoBlock';
import apiClient from '../../utils/apiClient';
import { ContentContainer, ContentGrid, LoaderGrid } from './WalletStyled';

const mapWallet = (walletData) => {
	return {
		id: walletData.id,
		logoURL: walletData.logo_url,
		tokensInWallet: walletData.tokens_in_wallet,
		name: walletData.wallet,
	};
};

const Wallet = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const defaultWallet = {
		id: '',
		logoURL: '',
		tokensInWallet: 0,
		name: '',
	};

	const [wallet, setWallet] = useState(defaultWallet);

	useEffect(() => {
		setIsLoading(true);

		// TODO: get wallet id by decoding the token. We get the token after login, which is not implemented yet.
		apiClient
			.get('/wallets/9d6c674f-ae62-4fab-8d14-ae5de9f14ab8')
			.then((response) => {
				const wallet = mapWallet(response.data);
				setWallet(wallet);
			})
			.catch((error) => {
				console.error(error);
				setIsError(true);
				setErrorMessage('An error occurred while fetching wallet data.');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	if (isLoading) {
		return (
			<LoaderGrid>
				<CircularProgress />
			</LoaderGrid>
		);
	}

	return (
		<Grid>
			<div>
				<header style={{ marginTop: '9.4vh', height: '10vh' }}>Wallet</header>
			</div>
			{isError && (
				<div style={{ display: 'inline-block', minWidth: '35%' }}>
					<Alert
						severity="error"
						onClose={() => setIsError(false)}>
						{errorMessage}
					</Alert>
				</div>
			)}
			<ContentContainer maxWidth="false">
				<ContentGrid>
					<WalletInfoBlock
						title={`Wallet ${wallet.name}`}
						innerNumber={wallet.tokensInWallet}
						innerText="tokens"
					/>
				</ContentGrid>
			</ContentContainer>
		</Grid>
	);
};

export default Wallet;
