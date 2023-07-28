import '@testing-library/jest-dom';
import apiClient from '../../utils/apiClient';
import { render, screen } from '@testing-library/react';
import SendTokens from './SendTokens';

jest.mock('../../utils/apiClient', () => ({
  get: jest.fn(() => Promise.resolve({ data: { wallets: [] } })),
}));

describe('Display available tokens v1', () => {
  const mockData = {
    data: {
      wallets: [
        {
          id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
          logo_url: 'https://example.com/logo.png',
          tokens_in_wallet: 100,
          name: 'test wallet',
        },
      ],
    },
  };

  it('display tokens_in_wallet for a wallet correctly', async () => {
    apiClient.get.mockResolvedValueOnce(mockData);

    render(<SendTokens />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await screen.findByText('Send Tokens');

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Available tokens')).toBeInTheDocument();
  });

  it('display error for failed request', async () => {
    apiClient.get.mockImplementationOnce(() => Promise.reject('API error'));

    render(<SendTokens />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    await screen.findByRole('alert');
    expect(screen.getByRole('alert')).toHaveTextContent(
      'An error occured while fetching wallet data.'
    );
  });
});
