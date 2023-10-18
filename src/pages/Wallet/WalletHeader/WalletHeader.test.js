import { render, screen } from '@testing-library/react';
import WalletHeader from './WalletHeader';

const mockHeaderData = {
  walletLogoURL: 'https://placehold.co/512x512',
  walletName: 'test wallet',
  pendingTransfers: 5,
};

describe('Wallet header', () => {
  it('renders correctly', () => {
    render(<WalletHeader {...mockHeaderData} />);

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getByRole('img', { name: /Wallet Logo/, src: mockHeaderData.walletLogoURL })).toBeInTheDocument();
    expect(screen.getByText(mockHeaderData.walletName)).toBeInTheDocument();
    expect(screen.getByText(`Pending transfers - ${mockHeaderData.pendingTransfers}`)).toBeInTheDocument();
  });
});