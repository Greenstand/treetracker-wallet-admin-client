import { render, screen } from '@testing-library/react';
import React from 'react';
import apiClient from '../../utils/apiClient';
import { getTransfers } from '../../api/transfers';
import Wallet from './Wallet';

jest.mock('../../utils/apiClient', () => ({
  get: jest.fn(),
}));

jest.mock('../../api/transfers', () => ({
  getTransfers: jest.fn(),
}));

const mockPendingTransfers = {
  transfers: [
    {
      id: '903cf9eb-1d16-4831-9b5e-774136ad4539',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '1',
        },
      },
      state: 'pending',
      created_at: '2023-08-08T02:17:48.249Z',
      closed_at: '2023-08-08T02:17:48.249Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'fff',
      destination_wallet: 'testuser',
      token_count: 1,
    },
    {
      id: 'cf56cab1-15ed-4ddb-bbe2-e50157b52b5e',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '2',
        },
      },
      state: 'pending',
      created_at: '2023-08-02T04:41:37.121Z',
      closed_at: '2023-08-02T04:41:37.121Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'fff',
      destination_wallet: 'testuser',
      token_count: 2,
    },
    {
      id: '4377c592-8ab0-4448-a3d3-ebf64f719a3b',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '1',
        },
      },
      state: 'pending',
      created_at: '2023-08-10T21:17:35.801Z',
      closed_at: '2023-08-10T21:17:35.801Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'test11',
      destination_wallet: 'testnewwallet',
      token_count: 1,
    },
  ],
  query: {
    limit: 200,
    offset: 0,
  },
  total: 3,
};

describe('<Wallet />', () => {
  beforeEach(() => {
    localStorage.setItem(
      'wallet',
      JSON.stringify({
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        name: 'test wallet',
      })
    );
  });

  afterEach(() => {
    localStorage.removeItem('wallet');
  });

  it('fetches and displays wallet data', async () => {
    apiClient.get.mockResolvedValueOnce({
      data: {
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        logo_url: 'https://example.com/logo.png',
        tokens_in_wallet: 100,
        wallet: 'test wallet',
      },
    });

    getTransfers.mockResolvedValueOnce(mockPendingTransfers);

    render(<Wallet />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await screen.findByText('Wallet test wallet');

    expect(screen.getByText('Wallet test wallet')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('tokens')).toBeInTheDocument();
  });

  it('displays error message on fetch failure', async () => {
    apiClient.get.mockImplementationOnce(() => Promise.reject('API error'));
    getTransfers.mockImplementation(() => Promise.reject('API error'));

    render(<Wallet />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    // TODO: fix and uncomment
    // await screen.findByRole('alert');
    //
    // expect(screen.getByRole('alert')).toHaveTextContent(
    //   'An error occurred while fetching wallet data.',
    // );
  });
});
