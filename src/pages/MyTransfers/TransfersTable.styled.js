import styled from '@emotion/styled';
import { MenuItem, Select, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

export const FilterLabelText = styled(Typography)({
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '3px',
});

export const TransferSelectFilter = styled(Select)({
  fontSize: '16px',
  borderRadius: '4px',
  border: '1px solid #E0E0E0',
  background: 'var(--neutral-white, #FFF)',
  height: '40px',
  fontWeight: '400',
  opacity: '0.8',
  padding: '8px',
  '& .MuiSelect-select:focus': {
    backgroundColor: 'transparent',
    color: 'inherit',
  },
});

export const SelectMenuItem = styled(MenuItem)({
  fontSize: '16px',
});

export const ArrowDropDownIcon = styled(ArrowDropDown)({
  fontSize: '24px',
});

