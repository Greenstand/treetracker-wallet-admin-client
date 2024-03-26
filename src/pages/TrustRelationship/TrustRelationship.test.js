import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../../components/UI/theme';
import AuthProvider from '../../store/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { TrustRelationshipsProvider } from '../../store/TrustRelationshipsContext';
import TrustRelationship from './TrustRelationship';
import { getTrustRelationships } from '../../api/trust_relationships';

jest.mock('../../api/trust_relationships', () => ({
  getTrustRelationships: jest.fn(),
}));

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

const mockTrustRelationshipsData = {
        "trust_relationships": [
            {
                "id": "08f64a56-4470-4774-9b7b-f218bb8c2302",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "e009c2bf-e6ea-4614-ae68-cbef0d2aaf87",
                "type": "send",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "send",
                "state": "requested",
                "created_at": "2024-03-24T13:06:25.226Z",
                "updated_at": "2024-03-24T13:06:25.226Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-testwallet1"
            },
            {
                "id": "0e14c951-a646-4c27-b409-1ab444825caf",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "03b4a0ef-da95-4517-b4a0-0b61b5bec6ed",
                "type": "send",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "send",
                "state": "requested",
                "created_at": "2024-03-24T13:11:09.707Z",
                "updated_at": "2024-03-24T13:11:09.707Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-testwallet4"
            },
            {
                "id": "180f1bda-b143-451f-ab6a-65ea6822b86e",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "86d38055-cf79-4362-bab8-577bcf98c1dd",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2024-03-24T13:08:58.200Z",
                "updated_at": "2024-03-24T13:08:58.200Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "samwel"
            },
            {
                "id": "261a2ba2-5dac-4ba7-8523-fe79b5600d5b",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "dc937897-f5a0-411d-8fce-e6c570870865",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2023-12-12T12:55:43.364Z",
                "updated_at": "2023-12-12T12:55:43.364Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "wallet12"
            },
            {
                "id": "351ab720-a5c2-401d-8115-c7e03ebe2080",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "e2bb1f0f-7313-44be-8957-7c1a21ab0472",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2024-03-24T13:08:10.257Z",
                "updated_at": "2024-03-24T13:08:10.257Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-testwallet8"
            },
            {
                "id": "465aef12-6630-400d-9957-006b17667778",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "9c6476f9-bfdd-454a-9fee-e159dbd4bc22",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2023-12-12T12:55:34.850Z",
                "updated_at": "2023-12-12T12:55:34.850Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "wallet9"
            },
            {
                "id": "507f56c0-8821-488d-bc3c-33880aade0b5",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "30d52732-ea3d-4630-b0a6-7b2eed0d354a",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2023-12-12T12:55:02.851Z",
                "updated_at": "2023-12-12T12:55:02.851Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "wallet2"
            },
            {
                "id": "59305e75-d844-427a-8a12-1706639a329c",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "e9369834-6dd3-4f33-8a44-755617642a51",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2024-03-24T13:08:31.205Z",
                "updated_at": "2024-03-24T13:08:31.205Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-testwallet9"
            },
            {
                "id": "65aa05df-f4e9-4d75-99c2-aaa42282d5a0",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "08aa9d9b-67b1-4082-ace5-8bdcf3954579",
                "type": "manage",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "manage",
                "state": "trusted",
                "created_at": "2024-03-24T13:02:06.352Z",
                "updated_at": "2024-03-24T13:02:06.352Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-wallet"
            },
            {
                "id": "72013666-bd95-4f90-9c98-055ccda09e57",
                "actor_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "target_wallet_id": "370be245-5a31-4a37-8083-1e4d033a2d6e",
                "type": "send",
                "originator_wallet_id": "c59a6d29-7256-43d6-ac5d-61673e1d29bb",
                "request_type": "send",
                "state": "requested",
                "created_at": "2024-03-24T13:06:39.211Z",
                "updated_at": "2024-03-24T13:06:39.211Z",
                "active": true,
                "originating_wallet": "testuser",
                "actor_wallet": "testuser",
                "target_wallet": "sam-testwallet2"
            }
        ],
        "query": {
            "limit": 10,
            "offset": 0
        },
        "total": 10
};

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <TrustRelationshipsProvider>{props.children}</TrustRelationshipsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('Trust Relationships page', function () {
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
    getTrustRelationships.mockResolvedValueOnce(mockTrustRelationshipsData);
    render(
      <TestWrapper>
        <TrustRelationship />
      </TestWrapper>
    );
    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(await screen.findByTestId('trust-relationships-table')).toBeInTheDocument();
    expect(await screen.findByTestId('date-range-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('state-select-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('requestType-select-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('type-select-filter')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(
        mockTrustRelationshipsData.total + 1
      );
    });
  });
});