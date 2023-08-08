import { styled } from '@mui/system';
import { TableCell, Tooltip, tooltipClasses } from '@mui/material';

export const TableCellStyled = styled(TableCell)({
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '170px',
  width: '170px',
});

export const TooltipStyled = styled(Tooltip)({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: '0',
  },
});