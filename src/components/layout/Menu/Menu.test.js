import React from 'react';
import Menu from './Menu';
import { ThemeProvider } from '@mui/material';
import theme from '../../UI/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

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
    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(screen.getAllByRole('button')).toHaveLength(6);
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
