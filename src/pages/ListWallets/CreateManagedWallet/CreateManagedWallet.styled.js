import styled from '@emotion/styled';
import { Button, Typography } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const CreateNewWallet = styled(Button)({
  color: '#fff',
  height: '2.5rem',
  boxShadow: 'none',
  padding: '0.5rem 0.5rem 0.5rem 0.625rem',
});

export const CreateButton = styled(Button)({
  color: '#fff',
  boxShadow: 'none',
});

export const CreateSuccessIcon = styled(CheckCircleOutlineIcon)({
  color: '#86c232',
  height: '4.75rem',
  width: '4.75rem',
  marginBottom: '1.5rem',
});

export const CreateSuccessText = styled(Typography)({
  color: '#86c232',
  fontSize: '1.375rem',
  marginBottom: '2rem',
});
