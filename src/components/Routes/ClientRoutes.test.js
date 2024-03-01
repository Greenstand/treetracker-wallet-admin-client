import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../UI/theme';
import AuthContext from '../../store/auth-context';

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

describe('ClientRoutes component', () => {
  const TestWrapper = (props) => {
    const testContext = {
      isLoggedIn: true,
      login: () => {},
      logout: () => {},
    };
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <AuthContext.Provider value={testContext}>
            {props.children}
          </AuthContext.Provider>
        </Router>
      </ThemeProvider>
    );
  };

  beforeAll(() => {
    localStorage.setItem(
      'wallet',
      JSON.stringify({
        id: '9d6c674f-ae62-4fab-8d14-ae5de9f14ab8',
        wallet: 'test wallet',
      })
    );
  });

  afterAll(() => {
    localStorage.removeItem('wallet');
  });

  it('renders without crashing', async () => {
    render(
      <TestWrapper>
        <ClientRoutes></ClientRoutes>
      </TestWrapper>
    );

    //links have loaded
    await screen.findAllByRole('link');
    await screen.findByAltText(/Greenstand logo/);

    // screen.getByRole('');

    //Logo, Home, Send Tokens, and My Trasnfers for now
    expect(await screen.findAllByRole('link')).toHaveLength(6);
    expect(screen.getAllByRole('button')).toHaveLength(6);

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();
  });
});