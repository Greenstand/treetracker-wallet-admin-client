import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';

export const StyledBox = styled(Box)(() => ({
  flexGrow: 1,
  margin: '2rem',
  maxWidth: '60rem',
}));

export const StyledButton = styled(Button)`
  width: fit-content; /* Adjust the width of the button based on content */
`;
