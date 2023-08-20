import styled from '@emotion/styled';
import { Grid, Paper } from '@mui/material';

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
