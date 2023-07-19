import React from 'react';
import App from './App';
import { render, screen } from '@testing-library/react';

describe('App component', () => {

  it('should render correctly', async () => {
    render(<App />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    //load data
    await screen.findByAltText(/Greenstand logo/);
    await screen.findAllByRole('link');

    expect(screen.getAllByRole('link')).toHaveLength(3);
    expect(screen.getByText(/Home/)).toBeInTheDocument();
    expect(screen.getByText(/Send Tokens/)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });

});
