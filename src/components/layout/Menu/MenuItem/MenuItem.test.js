import { render, screen } from '@testing-library/react';
import MenuItem from './MenuItem';
import { ThemeProvider } from '@mui/material';
import theme from '../../../UI/theme';

import { BrowserRouter as Router } from 'react-router-dom';
import apiClient from '../../../../utils/apiClient';
import { TrustRelationshipsProvider } from '../../../../store/TrustRelationshipsContext';

jest.mock('../../../../utils/apiClient', () => ({
  apiClient: jest.fn(),
}));

describe('MenuItem tests v1', () => {
  const TestWrapper = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <TrustRelationshipsProvider>
          <Router>{props.children}</Router>
        </TrustRelationshipsProvider>
      </ThemeProvider>
    );
  };

  it('Links are rendered correctly', async () => {
    render(
      <TestWrapper>
        <MenuItem />
      </TestWrapper>
    );

    //links have loaded
    await screen.findAllByRole('link');

    expect(screen.getAllByRole('link')).toHaveLength(6);
    expect(screen.getAllByRole('button')).toHaveLength(6);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();
    expect(screen.getByText(/My Transfers/)).toBeInTheDocument();
  });
});
