import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const WalletLogo = styled('img')({
  height: '100px',
  width: '100px',
  borderRadius: '50%',
});

export const WalletTitle = styled(Typography)({
  color: 'var(--neutral-default, #373A3E)',
  fontSize: '32px',
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '40px',
});

export const WalletPendingTransfers = styled(Typography)({
  color: '#FF2B2B',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '24px',
  paddingTop: '15px',
});