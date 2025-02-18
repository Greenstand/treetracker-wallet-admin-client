import { render, screen } from '@testing-library/react';
import TrustRelationshipTable from './TrustRelationshipTable';
import { TrustRelationshipsProvider } from '../../store/TrustRelationshipsContext';
import { ThemeProvider } from '@mui/material';
import theme from '../../components/UI/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../../store/AuthProvider';

jest.mock('../../api/trust_relationships', () => ({
  getTrustRelationships: jest.fn(),
}));

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

const mockTableRows = [
  {
    id: '08f64a56-4470-4774-9b7b-f218bb8c2302',
    actor_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    target_wallet_id: 'e009c2bf-e6ea-4614-ae68-cbef0d2aaf87',
    type: 'send',
    originator_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    request_type: 'send',
    state: 'requested',
    created_at: '2024-03-24T13:06:25.226Z',
    updated_at: '2024-03-24T13:06:25.226Z',
    active: true,
    originating_wallet: 'testuser',
    actor_wallet: 'testuser',
    target_wallet: 'sam-testwallet1',
  },
  {
    id: '0e14c951-a646-4c27-b409-1ab444825caf',
    actor_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    target_wallet_id: '03b4a0ef-da95-4517-b4a0-0b61b5bec6ed',
    type: 'send',
    originator_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    request_type: 'send',
    state: 'requested',
    created_at: '2024-03-24T13:11:09.707Z',
    updated_at: '2024-03-24T13:11:09.707Z',
    active: true,
    originating_wallet: 'testuser',
    actor_wallet: 'testuser',
    target_wallet: 'sam-testwallet4',
  },
  {
    id: '180f1bda-b143-451f-ab6a-65ea6822b86e',
    actor_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    target_wallet_id: '86d38055-cf79-4362-bab8-577bcf98c1dd',
    type: 'manage',
    originator_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    request_type: 'manage',
    state: 'trusted',
    created_at: '2024-03-24T13:08:58.200Z',
    updated_at: '2024-03-24T13:08:58.200Z',
    active: true,
    originating_wallet: 'testuser',
    actor_wallet: 'testuser',
    target_wallet: 'samwel',
  },
  {
    id: '261a2ba2-5dac-4ba7-8523-fe79b5600d5b',
    actor_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    target_wallet_id: 'dc937897-f5a0-411d-8fce-e6c570870865',
    type: 'manage',
    originator_wallet_id: 'c59a6d29-7256-43d6-ac5d-61673e1d29bb',
    request_type: 'manage',
    state: 'trusted',
    created_at: '2023-12-12T12:55:43.364Z',
    updated_at: '2023-12-12T12:55:43.364Z',
    active: true,
    originating_wallet: 'testuser',
    actor_wallet: 'testuser',
    target_wallet: 'wallet12',
  },
];

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <TrustRelationshipsProvider>
            {props.children}
          </TrustRelationshipsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('TrustRelationship Table', () => {
  // todo: fix and remove skip
  it.skip('renders correctly', async () => {
    render(
      <TestWrapper>
        <TrustRelationshipTable
          tableTitle={'Trust Relationship'}
          tableRows={mockTableRows}
          totalRowCount={mockTableRows.length}
        />
      </TestWrapper>
    );

    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(
      await screen.findByTestId('trust-relationships-table')
    ).toBeInTheDocument();
    // expect(await screen.findByTestId('date-range-filter')).toBeInTheDocument();
    expect(
      await screen.findByTestId('state-select-filter')
    ).toBeInTheDocument();
    expect(await screen.findByTestId('reset-filters')).toBeInTheDocument();

    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Rows per page/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to previous page' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to next page' })
    ).toBeInTheDocument();
  });
});
