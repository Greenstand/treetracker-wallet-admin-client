import { render, screen } from '@testing-library/react';
import {
  DateRangeFilter,
  ResetButton,
  StateSelectFilter,
} from './TrustRelationshipsFilters';
import userEvent from '@testing-library/user-event';
import TrustRelationshipsFilter from '../../models/TrustRelationShipFilter';

const mockStateList = [
  {
    label: 'Requested',
    value: 'requested',
    color: 'black',
  },
  {
    label: 'Trusted',
    value: 'trusted',
    color: 'black',
  },
];

const mockDefaultFilter = new TrustRelationshipsFilter({
  state: '',
  type: '',
  request_type: '',
  before: null,
  after: null,
});

let mockFilter = mockDefaultFilter;
const setMockFilter = (newValue) => {
  mockFilter = newValue;
};

beforeEach(() => {
  setMockFilter(mockDefaultFilter);
});

describe('Trust Relationship table header', () => {
  // todo: fix and remove skip
  it.skip('Trust Relationship renders correctly', () => {
    const { rerender } = render(
      <StateSelectFilter
        filter={mockFilter}
        setFilter={setMockFilter}
        statesList={mockStateList}
        getStatusColor={() => ''}
      />
    );

    expect(screen.getByTestId('state-select-filter')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    const select = screen.getByRole('button');

    // click select button to test if options render
    userEvent.click(select);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('presentation')).toBeInTheDocument();
    expect(screen.getAllByRole('option')).toHaveLength(3);

    // click an option to test select value changes
    const option = screen.getByRole('option', { name: 'Requested' });
    userEvent.click(option);

    // force re-render to update the select component, as we are using mocked state
    rerender(
      <StateSelectFilter
        filter={mockFilter}
        setFilter={setMockFilter}
        statesList={mockStateList}
        getStatusColor={() => ''}
      />
    );

    expect(screen.queryByRole('presentation')).toBeNull();
    expect(screen.queryByRole('listbox')).toBeNull();
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(
      screen.getByRole('button', { name: 'Requested' })
    ).toBeInTheDocument();
  });
});
