import { styled } from '@mui/system';
import { Typography } from '@mui/material';

export const SubText = styled(Typography)({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
  overflowWrap: 'break-word',
  padding: '10px',
});

export const AmountText = styled(Typography)({
  fontSize: 24,
  lineHeight: '24px',
  fontWeight: 700,
  color: 'rgb(97,137,47)',
  textAlign: 'center',
  overflowWrap: 'break-word',
  paddingTop: '10px',
  paddingBottom: '10px',
});