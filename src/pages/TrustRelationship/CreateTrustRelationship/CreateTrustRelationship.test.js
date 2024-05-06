import { ThemeProvider } from '@mui/material';
import theme from '../../../components/UI/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from '../../../store/AuthProvider';
import { TrustRelationshipsProvider } from '../../../store/TrustRelationshipsContext';
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateTrustRelationship from './CreateTrustRelationship';

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
        <AuthProvider>
          <TrustRelationshipsProvider>
            {props.children}
          </TrustRelationshipsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
};

describe('Request trust relationship', function () {
  it('button renders correctly', async () => {
    render(
      <TestWrapper>
        <CreateTrustRelationship />
      </TestWrapper>
    );

    //button exists
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(
      screen.getByRole('button', { name: /\+ Create/ })
    ).toBeInTheDocument();

    //opening the modal
    const createButton = screen.getByRole('button');
    userEvent.click(createButton);

    expect(
      screen.getByRole('dialog', { name: /Request Trust Relationship/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Request Trust Relationship/ })
    ).toBeInTheDocument();

    // screen.getByRole('');
    expect(screen.getAllByRole('button')).toHaveLength(5);
    expect(screen.getByRole('button', { name: /close/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Cancel/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /^Request$/ })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Open/ })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Trust Request Type/ })
    ).toBeInTheDocument();
  });

  it('trust request type shows all options correctly', async () => {
    render(
      <TestWrapper>
        <CreateTrustRelationship />
      </TestWrapper>
    );

    //opening the modal
    const requestButton = screen.getByRole('button');
    userEvent.click(requestButton);

    const trustRequestType = screen.getByRole('button', {
      name: /Trust Request Type/,
    });
    userEvent.click(trustRequestType);

    expect(
      screen.getByRole('listbox', { name: /Trust Request Type/ })
    ).toBeInTheDocument();

    expect(screen.getAllByRole('option')).toHaveLength(3);
    expect(screen.getByRole('option', { name: /Send/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Deduct/ })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Manage/ })).toBeInTheDocument();

    // screen.getByRole('');
  });

  it('close and cancel buttons work correctly', async () => {
    render(
      <TestWrapper>
        <CreateTrustRelationship />
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
      screen.queryByRole('dialog', { name: /Request Trust Relationship/ })
    ).toBeNull();

    //closing the modal using the cancel button
    userEvent.click(createButton);

    const cancelButton = screen.getByRole('button', { name: /Cancel/ });
    await userEvent.click(cancelButton);

    await waitForElementToBeRemoved(() =>
      screen.getByRole('button', { name: /close/ })
    );

    expect(
      screen.queryByRole('dialog', { name: /Request Trust Relationship/ })
    ).toBeNull();
  });

  it('fields validation works correctly', async () => {
    render(
      <TestWrapper>
        <CreateTrustRelationship />
      </TestWrapper>
    );

    //opening the modal
    const createButton = screen.getByRole('button');
    userEvent.click(createButton);

    //request trust relationship button
    const requestButton = screen.getByRole('button', { name: /^Request$/ });

    //requesting with no field values
    userEvent.click(requestButton);
    expect(screen.queryByText(/Wallet name is required/)).toBeTruthy();
    expect(screen.queryByText(/Request Type is required/)).toBeTruthy();
    expect(screen.queryByText(/Requesting Wallet is required/)).toBeTruthy();

    //entering target wallet with invalid wallet name
    const targetWalletTextbox = screen.getByRole('textbox');
    userEvent.type(targetWalletTextbox, 'testwallet!@;/');
    expect(targetWalletTextbox.value).toBe('testwallet!@;/');
    userEvent.click(requestButton);
    expect(screen.queryByText(/Wallet can only contain numbers/)).toBeTruthy();

    //target wallet name with less than 3 characters
    userEvent.clear(targetWalletTextbox);
    userEvent.type(targetWalletTextbox, 'te');
    expect(targetWalletTextbox.value).toBe('te');
    userEvent.click(requestButton);
    expect(
      screen.queryByText(/Wallet name must be at least 3 characters long/)
    ).toBeTruthy();

    //
  });
});
