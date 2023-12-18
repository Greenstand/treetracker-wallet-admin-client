import styled from '@emotion/styled';
import { Container, Grid } from '@mui/material';

export const StyledGrid = styled(Grid)({
  width: '100%',
});

export const ContentContainer = styled(Container)({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  height: 'auto',
  maxWidth: 'false',
  margin: 0,
  '@media (min-width: 1200px)': {
    maxWidth: 'unset',
  },
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

export const LoaderContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 9999,
});