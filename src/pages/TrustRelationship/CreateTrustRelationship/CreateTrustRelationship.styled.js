import { Button } from '@mui/material';
import styled from '@emotion/styled';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const CreateNewRelationship = styled(Button)({
  color: '#fff',
  height: '2.5rem',
  boxShadow: 'none',
  padding: '0.5rem 0.5rem 0.5rem 0.625rem',
});

export const CreateSuccessIcon = styled(CheckCircleOutlineIcon)({
  color: '#86c232',
  height: '4.75rem',
  width: '4.75rem',
  marginBottom: '1.5rem',
});
