import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ClientRoutes from './ClientRoutes';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material';
import theme from '../UI/theme';
import AuthContext from '../../store/auth-context';


describe('ClientRoutes component', () => {

  const TestWrapper = (props) => {
    const testContext = {
      isLoggedIn: true,
      login: () => {
      },
      logout: () => {
      },
    };
    return <ThemeProvider theme={theme}>
      <Router>
        <AuthContext.Provider value={testContext}>
          {props.children}
        </AuthContext.Provider>
      </Router>
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

    // screen.getByRole('');

    //Logo, Home, Send Tokens, and My Trasnfers for now
    expect(await screen.findAllByRole('link')).toHaveLength(4);
    expect(screen.getAllByRole('button')).toHaveLength(4);

    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();

  });
});
