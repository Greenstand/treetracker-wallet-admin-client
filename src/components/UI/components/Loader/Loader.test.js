import React from 'react';
import { ThemeProvider } from '@mui/material';
import { Loader } from './Loader';
import theme from '../../theme';
import { render, screen } from '@testing-library/react';

describe('Loader component', () => {

  const TestWrapper = (props) => <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;

  it('should render correctly', () => {
    render(<TestWrapper>
      <Loader />
    </TestWrapper>);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

  });
});