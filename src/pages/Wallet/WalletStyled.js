import styled from '@emotion/styled';
import { Grid, Paper, Typography } from '@mui/material';

export const GridContainer = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '12px',
});

export const GridItem = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  height: 'auto',
  maxWidth: 'false',
});

export const WalletAbout = styled(Paper)({
  width: '100%',
  marginBottom: '15px',
  padding: '20px',
});

export const WalletAboutTitle = styled(Typography)({
  fontSize: '1.125rem',
  fontWeight: 700,
});

export const WalletAboutText = styled(Typography)({
  fontSize: '0.875rem',
});

export const ContentGrid = styled(Grid)({
  display: 'grid',
  // update when more blocks are added
  gridTemplateColumns: 'repeat(1, 20rem)',
  gridTemplateRows: 'repeat(1, 20rem)',
  gridGap: '2rem',
  color: '#444',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 20rem)',
    gridTemplateRows: 'repeat(1, 20rem)',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(1, 20rem)',
    gridTemplateRows: 'repeat(1, 20rem)',
  },
});
