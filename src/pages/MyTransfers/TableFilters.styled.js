import styled from '@emotion/styled';
import { Button, Grid, MenuItem, Select, Typography } from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';
import { DateRangeIcon } from '@mui/x-date-pickers';

export const FilterLabelText = styled(Typography)({
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '3px',
});

export const SelectFilter = styled(Select)({
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
  // for MenuItem with empty value ('')
  // for some reason belongs to a different class
  '& .MuiOutlinedInput-input.MuiSelect-select:focus': {
    backgroundColor: 'transparent',
    color: 'inherit',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  ':hover': {
    border: '1px solid black',
  },
});

export const SelectMenuItem = styled(MenuItem)({
  fontSize: '16px',
});

export const ArrowDropDownIcon = styled(ArrowDropDown)({
  fontSize: '24px',
});

export const DateFilterTitle = styled(Grid)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const DateRangeButton = styled(Button)({
  fontSize: '12px',
  borderRadius: '4px',
  border: '1px solid #E0E0E0',
  background: 'var(--neutral-white, #FFF)',
  height: '40px',
  fontWeight: '400',
  opacity: '0.8',
  padding: '8px 8px 8px 10px',
  textTransform: 'none',
  justifyContent: 'space-between',
  color: '#585B5D',
  ':hover': {
    background: 'var(--neutral-white, #FFF)',
    border: '1px solid black',
  },
});

export const DateRangeFilterIcon = styled(DateRangeIcon)({
  color: '#86c232',
});

export const FilterResetButton = styled(Button)({
  color: '#fff',
  height: '2.5rem',
  boxShadow: 'none',
  padding: '0.5rem 0.5rem 0.5rem 0.625rem',
});