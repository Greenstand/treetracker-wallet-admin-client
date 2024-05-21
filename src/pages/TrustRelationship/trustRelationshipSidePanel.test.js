import TrustRelationshipSidePanel from "./trustRelationshipSidePanel";
import { render, screen } from '@testing-library/react';
import { TrustRelationshipsProvider } from "../../store/TrustRelationshipsContext";
import { ThemeProvider } from "@emotion/react";
import theme from "../../components/UI/theme";


jest.mock('../../api/trust_relationships', () => ({
    getTrustRelationships: jest.fn()
  }));

const mockRowInfo = {
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
}

const TestWrapper = (props) => {
    return (
     <ThemeProvider theme={theme}>
           <TrustRelationshipsProvider>{props.children}</TrustRelationshipsProvider>;
    </ThemeProvider>
    )
  };

describe('Trust Relationship side Panel', () => {
    test('renders correctly', () => {
     render(
        <TestWrapper>
            <TrustRelationshipSidePanel
            open={true}
            onClose={() =>{}}
            rowInfo={mockRowInfo}
            />
        </TestWrapper>
      );
  
      expect(screen.getByText('Source Wallet:')).toBeInTheDocument();
      expect(screen.getByText('Target Wallet:')).toBeInTheDocument();
      expect(screen.getByText('Initiated By:')).toBeInTheDocument();
      expect(screen.getByText('Request Type:')).toBeInTheDocument();
    });
});

    