import { styled } from '@mui/system';
import { TableCell, Tooltip, tooltipClasses } from '@mui/material';

export const TableCellStyled = styled(TableCell)({
  fontSize: '14px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100vw',
});

export const TooltipStyled = styled(Tooltip)({
  [`& .${tooltipClasses.tooltip}`]: {
    margin: '0',
  },
});
