import React from 'react';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import theme from '../UI/theme';

describe('Layout component', () => {
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
        <Layout></Layout>
      </TestWrapper>
    );

    //load data
    await screen.findByAltText(/Greenstand logo/);
    await screen.findAllByRole('link');

    expect(screen.getAllByRole('link')).toHaveLength(5);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();
    expect(screen.getByText(/My Transfers/)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });
});
