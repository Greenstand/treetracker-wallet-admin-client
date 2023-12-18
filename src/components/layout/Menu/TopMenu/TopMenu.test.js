import React from 'react';
import TopMenu from './TopMenu';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from '../../../UI/theme';
import { render, screen } from '@testing-library/react';

describe('TopMenu component', () => {
  const TestWrapper = (props) => {
    return <ThemeProvider theme={theme}>
      <Router>
        {props.children}
      </Router>
    </ThemeProvider>;
  };

  it('renders correctly', async () => {
    render(<TestWrapper>
      <TopMenu />
    </TestWrapper>);

    //logo has loaded
    await screen.findByAltText(/Greenstand logo/);

    expect(screen.getAllByRole('img')).toHaveLength(1);
    expect(screen.getAllByRole('link')).toHaveLength(1);

    //drawer button
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button'))
      .toHaveAttribute('aria-label', expect.stringMatching(/open drawer/));
  });

});