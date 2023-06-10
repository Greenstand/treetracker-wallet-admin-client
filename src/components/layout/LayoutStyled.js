import { Grid } from '@mui/material';
import { styled } from '@mui/system';

export const StyledContent = styled(Grid)(({ theme }) => ({
  flexGrow: 1,
  padding: `0 ${theme.spacing(3)} 0 ${theme.spacing(3)}`,
  backgroundColor: 'rgb(239, 239, 239)',
  minHeight: '100vh',
  height: '100%',
  width: 'unset',
}));
