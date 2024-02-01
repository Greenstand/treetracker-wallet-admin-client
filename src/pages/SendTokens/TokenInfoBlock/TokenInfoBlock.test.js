import '@testing-library/jest-dom';
import apiClient from '../../../utils/apiClient';
import { render, screen } from '@testing-library/react';
import SendTokens from '../SendTokens';
import TokenInfoBlock from './TokenInfoBlock';

jest.mock('../../../utils/apiClient', () => ({
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        wallets: [],
      },
    })
  ),
}));

describe('Display available tokens v1', () => {
  const mockData = {
    data: {
      wallets: [
        {
          id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
          logo_url: 'https://example.com/logo.png',
          tokens_in_wallet: 1000,
          name: 'test wallet',
        },
      ],
    },
  };

  beforeEach(() => {
    localStorage.setItem(
      'wallet',
      JSON.stringify({
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        wallet: 'test wallet',
      })
    );
  });

  afterEach(() => {
    localStorage.removeItem('wallet');
  });

  it('display tokens_in_wallet for a wallet correctly', async () => {
    apiClient.get.mockResolvedValueOnce(mockData);

    // TODO: fix this test
    // render(
    //   <TokenInfoBlock
    //     totalTokens="1000"
    //     senderWalletName={mockData.name}
    //     senderWalletTokens="1000"
    //   />
    // );
    // expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // await screen.findByText('Send Tokens');

    // expect(screen.getByText('1,000')).toBeInTheDocument();
    // expect(screen.getByText('Available Tokens')).toBeInTheDocument();
  });

  it('display error for failed request', async () => {
    apiClient.get.mockImplementationOnce(() => Promise.reject('API error'));

    // TODO: fix this test
    // render(<SendTokens />);

    // expect(screen.getByRole('progressbar')).toBeInTheDocument();
    // await screen.findByRole('alert');
    // expect(screen.getByRole('alert')).toHaveTextContent(
    //   'An error occured while fetching wallet data.'
    // );
  });

  it('display sub wallet tokens correctly', async () => {
    const senderWalletData = {
      name: 'WalletA',
      tokensInWallet: '500',
    };

    // TODO: fix this test
    //     render(
    //       <TokenInfoBlock
    //         totalTokens="1000"
    //         senderWalletName={mockData.name}
    //         senderWalletTokens="500"
    //       />
    //     );

    //     await screen.findByText('Available Tokens');

    //     expect(screen.getByText('1000')).toBeInTheDocument();
    //     expect(screen.getByText('500')).toBeInTheDocument();
    //     expect(screen.getByText('WalletA Tokens')).toBeInTheDocument();
  });
});