import { render, screen } from '@testing-library/react';
import { DateRangeFilter, ResetButton, TransferSelectFilter } from './TableFilters';
import userEvent from '@testing-library/user-event';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TransferFilter from '../../models/TransferFilter';

const TestWrapper = (props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {props.children}
    </LocalizationProvider>
  );
};

const mockStatusList = [{
  label: 'Requested',
  value: 'requested',
  color: 'black',
},
  {
    label: 'Pending',
    value: 'pending',
    color: 'black',
  }];

const mockDefaultFilter = new TransferFilter({
  state: '',
  before: null,
  after: null,
  wallet: null,
});

let mockFilter = mockDefaultFilter;
const setMockFilter = (newValue) => {
  mockFilter = newValue;
};

beforeEach(() => {
  setMockFilter(mockDefaultFilter);
});

describe('Transfers table header', () => {

  it('Transfer filter renders correctly', () => {
    const { rerender } = render(
      <TransferSelectFilter filter={mockFilter} setFilter={setMockFilter} statusList={mockStatusList}
                            getStatusColor={() => ''} />,
    );

    expect(screen.getByTestId('transfer-status-filter')).toBeInTheDocument();
    expect(screen.getByText('Transfer Status')).toBeInTheDocument();

    expect(screen.getByText('None')).toBeInTheDocument();
    const select = screen.getByRole('button');

    // click select button to test if options render
    userEvent.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);

    // click an option to test select value changes
    const option = screen.getByRole('option', { name: 'Pending' });
    userEvent.click(option);

    // force re-render to update the select component, as we are using mocked state
    rerender(<TransferSelectFilter filter={mockFilter} setFilter={setMockFilter} statusList={mockStatusList}
                                   getStatusColor={() => ''} />);

    expect(screen.queryByRole('presentation')).toBeNull();
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByRole('button', { name: 'Pending' })).toBeInTheDocument();
  });

  it('Date range filter renders correctly', async () => {
    render(
      <TestWrapper>
        <DateRangeFilter filter={mockFilter} setFilter={setMockFilter} />
      </TestWrapper>,
    );

    expect(screen.getByTestId('date-range-filter')).toBeInTheDocument();
    expect(screen.getByText('Created Date')).toBeInTheDocument();

    expect(screen.getByText('mm/dd/yyyy - mm/dd/yyyy')).toBeInTheDocument();

    const button = screen.getByRole('button');
    userEvent.click(button);

    expect(screen.getByText('Enter dates')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();

    expect(screen.getAllByRole('textbox')).toHaveLength(2);
    expect(screen.getByRole('textbox', { name: 'Start date' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'End date' })).toBeInTheDocument();

    expect(screen.getAllByRole('button')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Choose date' })).toHaveLength(2);

    // test typing date
    const dateTextbox = screen.getByRole('textbox', { name: 'Start date' });
    userEvent.type(dateTextbox, '08201993');
    expect(dateTextbox.value).toBe('08/20/1993');

    const dateButton = screen.getByRole('button', { name: 'Choose date, selected date is Aug 20, 1993' });
    userEvent.click(dateButton);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Previous month' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next month' })).toBeInTheDocument();
    expect(screen.getByRole('grid')).toBeInTheDocument();

    const newDate = screen.getByText('10');
    userEvent.click(newDate);

    expect(dateTextbox.value).toBe('08/10/1993');
    await screen.findByRole('dialog', { hidden: true });
  });

  it('Reset filters button renders correctly', () => {
    render(<ResetButton setFilter={setMockFilter} defaultFilter={mockDefaultFilter} />);

  });
});