import { TransfersProvider } from '../../store/TransfersContext';
import { render, screen, waitFor } from '@testing-library/react';
import TransfersTable from './TransfersTable';

const mockTableRows = [
  {
    'transfer_id': 'df80b648-4fef-4ca6-b704-9e7e1c77d1ed',
    'sender_wallet': 'testuser',
    'token_amount': 1,
    'receiver_wallet': 'wallet2',
    'created_date': '2023-08-01T17:09:35.642Z',
    'initiated_by': 'testuser',
    'status': 'completed',
  },
  {
    'transfer_id': '03537683-5356-42f4-97b2-95ba287a453a',
    'sender_wallet': 'testuser',
    'token_amount': 1,
    'receiver_wallet': 'wallet2',
    'created_date': '2023-08-01T17:09:40.908Z',
    'initiated_by': 'testuser',
    'status': 'completed',
  },
  {
    'transfer_id': 'a6e70651-1016-43b3-b214-35a569ae7b91',
    'sender_wallet': 'testuser',
    'token_amount': 1,
    'receiver_wallet': 'wallet2',
    'created_date': '2023-08-01T17:13:30.055Z',
    'initiated_by': 'testuser',
    'status': 'completed',
  },
];

const TestWrapper = (props) => {
  return (
    <TransfersProvider>
      {props.children}
    </TransfersProvider>
  );
};

describe('Transfers Table', () => {
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

  it('renders correctly', async () => {
    render(
      <TestWrapper>
        <TransfersTable
          tableTitle={'My Transfers'}
          tableRows={mockTableRows}
          totalRowCount={3}
        />
      </TestWrapper>);

    expect(await screen.findByTestId('table-pagination')).toBeInTheDocument();
    expect(await screen.findByTestId('transfers-table')).toBeInTheDocument();
    expect(await screen.findByTestId('date-range-filter')).toBeInTheDocument();
    expect(await screen.findByTestId('transfer-status-filter')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole('row')).toHaveLength(3 + 1);
      expect(screen.getAllByRole('columnheader')).toHaveLength(8);
      expect(screen.getAllByRole('cell')).toHaveLength(8 * 3);
    });

    expect(screen.getByRole('button', { name: 'Rows per page: 10' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to previous page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go to next page' })).toBeInTheDocument();
  });

});