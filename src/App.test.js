import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App component', () => {

  it('should redirect to login', async () => {
    render(<App />);
    
    //load data
    await screen.findByAltText(/Greenstand logo/);

    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: /Wallet Admin Panel/ })).toBeInTheDocument();

    //type='password' doesn't have a role, so no getByRole
    expect(screen.getByLabelText('Password *')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Wallet/ })).toBeInTheDocument();

    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /LOG IN/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '' })).toHaveAttribute('name', 'password visibility');

  });

});
