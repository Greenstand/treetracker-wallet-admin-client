import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../../components/UI/theme';
import AuthProvider from '../../store/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { TransfersProvider } from '../../store/TransfersContext';
import MyTransfers from './MyTransfers';
import { getTransfers } from '../../api/transfers';

jest.mock('../../api/transfers', () => ({
  getTransfers: jest.fn(),
}));

const mockTransfersData = {
  transfers: [
    {
      id: 'df80b648-4fef-4ca6-b704-9e7e1c77d1ed',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '1',
        },
      },
      state: 'completed',
      created_at: '2023-08-01T17:09:35.642Z',
      closed_at: '2023-08-01T17:09:35.642Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'testuser',
      destination_wallet: 'wallet2',
      token_count: 1,
    },
    {
      id: '03537683-5356-42f4-97b2-95ba287a453a',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '1',
        },
      },
      state: 'completed',
      created_at: '2023-08-01T17:09:40.908Z',
      closed_at: '2023-08-01T17:09:40.908Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'testuser',
      destination_wallet: 'wallet2',
      token_count: 1,
    },
    {
      id: 'a6e70651-1016-43b3-b214-35a569ae7b91',
      type: 'send',
      parameters: {
        bundle: {
          bundleSize: '1',
        },
      },
      state: 'completed',
      created_at: '2023-08-01T17:13:30.055Z',
      closed_at: '2023-08-01T17:13:30.055Z',
      active: true,
      claim: false,
      originating_wallet: 'testuser',
      source_wallet: 'testuser',
      destination_wallet: 'wallet2',
      token_count: 1,
    },
  ],
  query: {
    limit: 200,
    offset: 0,
  },
  total: 3,
};

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <TransfersProvider>{props.children}</TransfersProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('My Transfers page', function() {
  beforeEach(() => {
    localStorage.setItem(
      'wallet',
      JSON.stringify({
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        wallet: 'test wallet',
      }),
    );
  });

  afterEach(() => {
    localStorage.removeItem('wallet');
  });

  it('renders table pagination correctly', async () => {
    getTransfers.mockResolvedValueOnce(mockTransfersData);
    render(
      <TestWrapper>
        <MyTransfers />
      </TestWrapper>,
    );
    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(await screen.findByTestId('transfers-table')).toBeInTheDocument();
    expect(await screen.findByTestId('date-range-filter')).toBeInTheDocument();
    expect(
      await screen.findByTestId('transfer-status-filter'),
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(mockTransfersData.total + 1);
    });
  });
});
