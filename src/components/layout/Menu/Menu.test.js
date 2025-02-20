import React from 'react';
import Menu from './Menu';
import { ThemeProvider } from '@mui/material';
import theme from '../../UI/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import apiClient from '../../../utils/apiClient';
import { acceptTrustRelationship } from '../../../api/trust_relationships';

jest.mock('../../../utils/apiClient', () => ({
  apiClient: jest.fn(),
}));
jest.mock('../../../api/trust_relationships', () => ({
  acceptTrustRelationship : jest.fn(),
}));

describe('Menu component', () => {
  const TestWrapper = (props) => {
    return (
      <ThemeProvider theme={theme}>
        <Router>{props.children}</Router>
      </ThemeProvider>
    );
  };

  it('renders correctly', async () => {
    render(
      <TestWrapper>
        <Menu />
      </TestWrapper>
    );

    //links have loaded
    await screen.findAllByRole('link');
    await screen.findByAltText(/Greenstand logo/);

    //Logo, Home,  Send Tokens, My Transfers for now
    expect(screen.getAllByRole('link')).toHaveLength(7);
    expect(screen.getAllByRole('button')).toHaveLength(8);
    expect(
      screen.getByRole('button', {
        name: /open drawer/,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();
    expect(screen.getByText(/My Transfers/)).toBeInTheDocument();
  });
});
