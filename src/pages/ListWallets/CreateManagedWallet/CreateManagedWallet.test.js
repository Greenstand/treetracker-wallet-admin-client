import { ThemeProvider } from '@mui/material';
import theme from '../../../components/UI/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../../../store/AuthProvider';
import { WalletsProvider } from '../../../store/WalletsContext';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import CreateManagedWallet from './CreateManagedWallet';
import userEvent from '@testing-library/user-event';
import { createWallet } from '../../../api/wallets';
import { wait } from '@testing-library/user-event/dist/utils';

jest.mock('react-secure-storage', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
});

jest.mock('../../../api/wallets', () => {
  return {
    createWallet: jest.fn(),
  };
});

const TestWrapper = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <WalletsProvider>{props.children}</WalletsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('Create managed wallet', function () {
  it('button renders correctly', async () => {
    render(
      <TestWrapper>
        <CreateManagedWallet />
      </TestWrapper>
    );

    //button exists
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(
      screen.getByRole('button', { name: /Create Managed Wallet/ })
    ).toBeInTheDocument();

    //opening the modal
    const createButton = screen.getByRole('button');
    userEvent.click(createButton);

    expect(
      screen.getByRole('dialog', { name: /Create Managed Wallet/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Create Managed Wallet/ })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /close/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create/ })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: /Wallet Name/ })
    ).toBeInTheDocument();
  });

  it('wallet validation works correctly', async () => {
    render(
      <TestWrapper>
        <CreateManagedWallet />
      </TestWrapper>
    );

    //opening the modal
    const createButton = screen.getByRole('button');
    userEvent.click(createButton);

    //create button
    const createWalletButton = screen.getByRole('button', { name: /Create/ });

    //creating wallet with no wallet text
    userEvent.click(createWalletButton);
    expect(screen.queryByText(/Wallet name is required/)).toBeTruthy();

    //creating wallet with invalid wallet name
    const textbox = screen.getByRole('textbox');
    userEvent.type(textbox, 'testwallet!@;/');
    expect(textbox.value).toBe('testwallet!@;/');
    userEvent.click(createWalletButton);
    expect(screen.queryByText(/Wallet can only contain numbers/)).toBeTruthy();

    //creating wallet with less than 3 characters
    userEvent.clear(textbox);
    userEvent.type(textbox, 'te');
    expect(textbox.value).toBe('te');
    userEvent.click(createWalletButton);
    expect(
      screen.queryByText(/Wallet name must be at least 3 characters long/)
    ).toBeTruthy();
  });

  it('close and cancel buttons work correctly', async () => {
    render(
      <TestWrapper>
        <CreateManagedWallet />
      </TestWrapper>
    );

    //opening the modal
    const createButton = screen.getByRole('button');

    //closing the modal using the close button
    userEvent.click(createButton);

    const closeButton = screen.getByRole('button', { name: /close/ });
    await userEvent.click(closeButton);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /close/ })
    );

    expect(
      screen.queryByRole('dialog', { name: /Create Managed Wallet/ })
    ).toBeNull();

    //closing the modal using the cancel button
    userEvent.click(createButton);

    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /close/ })
    );

    expect(
      screen.queryByRole('dialog', { name: /Create Managed Wallet/ })
    ).toBeNull();
  });

  it('create valid wallet successfully', async () => {
    createWallet.mockResolvedValueOnce('testwallet');

    render(
      <TestWrapper>
        <CreateManagedWallet />
      </TestWrapper>
    );

    //opening the modal
    const createButton = screen.getByRole('button');
    userEvent.click(createButton);

    //create button
    const createWalletButton = screen.getByRole('button', { name: /Create/ });

    //creating wallet with no wallet text
    const textbox = screen.getByRole('textbox');
    userEvent.type(textbox, 'testwallet');
    userEvent.click(createWalletButton);

    await waitForElementToBeRemoved(() =>
      screen.queryByRole('button', { name: /Create/ })
    );

    expect(
      screen.queryByText(/Wallet created successfully/)
    ).toBeInTheDocument();

    // screen.getByRole('');
  });
});
