import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import Login from './Login';
import { render, screen } from '@testing-library/react';
import AuthProvider from '../../store/AuthProvider';
import theme from '../../components/UI/theme';

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>{props.children}</AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('Login component', () => {
  it('should render correctly', async () => {
    render(<Login />, { wrapper: TestWrapper });

    //load data
    await screen.findByAltText(/Greenstand logo/);

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: /Wallet Admin Panel/ })
    ).toBeInTheDocument();

    //type='password' doesn't have a role, so no getByRole
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Wallet/ })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /API Key/ })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /LOG IN/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toHaveAttribute(
      'name',
      'password visibility'
    );
  });
});
