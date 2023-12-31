import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../../components/UI/theme';
import AuthProvider from '../../store/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { WalletsProvider } from '../../store/WalletsContext';
import ListWallets from './ListWallets';
import { getWallets } from '../../api/wallets';

jest.mock('../../api/wallets', () => ({
  getWallets: jest.fn(),
}));

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

const mockWalletsData = {
  total: 12,
  query: {
    limit: 1000,
    offset: 0,
    sort_by: 'created_at',
    order: 'desc',
  },
  wallets: [
    {
      id: 'dc937897-f5a0-411d-8fce-e6c570870865',
      name: 'wallet12',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:43.364Z',
      tokens_in_wallet: 0,
    },
    {
      id: '8b80c4cd-4609-4882-ad15-862000a5786e',
      name: 'wallet11',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:40.836Z',
      tokens_in_wallet: 0,
    },
    {
      id: 'eee50580-8460-483f-856e-bcbce8c8fb31',
      name: 'wallet10',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:38.607Z',
      tokens_in_wallet: 0,
    },
    {
      id: '9c6476f9-bfdd-454a-9fee-e159dbd4bc22',
      name: 'wallet9',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:34.850Z',
      tokens_in_wallet: 0,
    },
    {
      id: '5758358e-eea3-480e-bbe5-ea329130068a',
      name: 'wallet8',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:31.582Z',
      tokens_in_wallet: 0,
    },
    {
      id: '84872f38-6cc3-4f60-ad91-2b616337893c',
      name: 'wallet7',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:28.094Z',
      tokens_in_wallet: 0,
    },
    {
      id: '89c5310c-5baf-49c1-94d0-ae57a217801a',
      name: 'wallet6',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:24.412Z',
      tokens_in_wallet: 0,
    },
    {
      id: '7aeca165-f999-440d-9821-d39bf3078ec2',
      name: 'wallet5',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:21.375Z',
      tokens_in_wallet: 0,
    },
    {
      id: 'e0d8666d-511b-46bc-a1a9-ccca3e216a3b',
      name: 'wallet4',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:18.919Z',
      tokens_in_wallet: 0,
    },
    {
      id: '86cb813d-8107-4f3d-86c7-22570cef17fc',
      name: 'wallet3',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:05.789Z',
      tokens_in_wallet: 0,
    },
    {
      id: '30d52732-ea3d-4630-b0a6-7b2eed0d354a',
      name: 'wallet2',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:55:02.851Z',
      tokens_in_wallet: 0,
    },
    {
      id: '5bc12fbe-244e-45f2-a521-0b3a8efcaa08',
      name: 'wallet1',
      about: null,
      logo_url: null,
      created_at: '2023-12-12T12:54:56.855Z',
      tokens_in_wallet: 0,
    },
  ],
};

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <WalletsProvider>{props.children}</WalletsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('Wallets List page', function () {
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

  it('renders table pagination correctly', async () => {
    getWallets.mockResolvedValueOnce(mockWalletsData);
    render(
      <TestWrapper>
        <ListWallets />
      </TestWrapper>
    );
    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(await screen.findByTestId('table')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(
        mockWalletsData.total + 1
      );
    });
  });
});
