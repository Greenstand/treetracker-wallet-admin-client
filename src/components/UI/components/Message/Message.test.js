import React from 'react';
import Message from './Message';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Message component', () => {
  it('renders correctly', () => {
    const mockOnClose = jest.fn();

    render(<Message message={'TEST MESSAGE'} onClose={mockOnClose} />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/TEST MESSAGE/)).toBeInTheDocument();

    //Close button
    expect(screen.getAllByRole('button')).toHaveLength(1);
    const button = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(button);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});