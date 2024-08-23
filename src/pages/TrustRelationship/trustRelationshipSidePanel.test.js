import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import TrustRelationshipSidePanel from './trustRelationshipSidePanel';
import { ThemeProvider } from '@emotion/react';
import theme from '../../components/UI/theme';
import { TrustRelationshipsProvider } from '../../store/TrustRelationshipsContext';
import { getWallets } from '../../api/wallets';

jest.mock('../../api/trust_relationships', () => ({
  getTrustRelationships: jest.fn(),
  acceptTrustRelationship: jest.fn(),
  declineTrustRelationship: jest.fn(),
  deleteTrustRelationship: jest.fn()
}));

jest.mock('../../api/wallets', () => ({
  getWallets: jest.fn(),
}));

const mockRowInfo = {
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
  target_wallet: 'sam-testwallet1'
};

const mockManagedWallets = {
  wallets: [
    { id: 'e009c2bf-e6ea-4614-ae68-cbef0d2aaf87', name: 'sam-testwallet1' }
  ]
};

const TestWrapper = ({ children }) => (
  <ThemeProvider theme={theme}>
    <TrustRelationshipsProvider>
      {children}
    </TrustRelationshipsProvider>
  </ThemeProvider>
);

describe('Trust Relationship Side Panel', () => {
  beforeEach(() => {
    getWallets.mockResolvedValue(mockManagedWallets);
  });

  test('renders correctly', async () => {
    await act(async () => {
      render(
        <TestWrapper>
          <TrustRelationshipSidePanel
            open={true}
            onClose={() => {}}
            rowInfo={mockRowInfo}
          />
        </TestWrapper>
      );
    });

    // Ensure the component renders correctly
    expect(screen.getByText('Source Wallet:')).toBeInTheDocument();
    expect(screen.getByText('Target Wallet:')).toBeInTheDocument();
    expect(screen.getByText('Initiated By:')).toBeInTheDocument();
    expect(screen.getByText('Request Type:')).toBeInTheDocument();

    // Wait for the context to be updated
    await waitFor(() => {
      const context = screen.getByText('sam-testwallet1');
      expect(context).toBeInTheDocument();
    });
  });
});

    