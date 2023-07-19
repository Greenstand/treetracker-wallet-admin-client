import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../UI/theme';

describe('ClientRoutes component', () => {

  const TestWrapper = (props) => {
    return <ThemeProvider theme={theme}>
      <Router>{props.children}</Router>
    </ThemeProvider>
      ;
  };


  it('renders without crashing', async () => {
    render(
      <TestWrapper>
        <ClientRoutes>
        </ClientRoutes>
      </TestWrapper>,
    );

    //links have loaded
    await screen.findAllByRole('link');
    await screen.findByAltText(/Greenstand logo/);

    //Logo, Home and Send Tokens for now
    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getAllByRole('button')).toHaveLength(3);

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();

  });
});
