import { styled } from '@mui/system';
import { TableCell } from '@mui/material';

export const TableCellStyled = styled(TableCell)({
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '125px',
});