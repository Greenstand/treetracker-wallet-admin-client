import { Button, Card, CardActions, CardContent, FormControl, Grid, Popover, Typography } from '@mui/material';
import {
  ArrowDropDownIcon,
  DateFilterTitle,
  FilterLabelText,
  SelectFilter,
  SelectMenuItem,
  DateRangeButton, DateRangeFilterIcon,
} from './TableFilters.styled';
import React, { useState } from 'react';
import { DatePicker, DateRangeIcon } from '@mui/x-date-pickers';
import { getDateText } from '../../utils/formatting';

export const TransferFilter = ({ transferFilterValue, setTransferFilterValue, statusList }) => {

  // select value color must match the menuitem color
  // 'None' option has a default color
  const getSelectColor = () => {
    return transferFilterValue
      ? statusList.find(x => x.value === transferFilterValue).color
      : '#585B5D';
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Transfer Status</FilterLabelText>

      <SelectFilter
        displayEmpty
        value={transferFilterValue}
        onChange={(e) => setTransferFilterValue(e.target.value)}
        IconComponent={ArrowDropDownIcon}
        sx={{
          color: getSelectColor(),
        }}
      >
        <SelectMenuItem value={''}>None</SelectMenuItem>

        {statusList.map((status, index) => {
          return (<SelectMenuItem key={index} value={status.value}
                                  sx={{ color: status.color }}>{status.label}</SelectMenuItem>);
        })}
      </SelectFilter>
    </FormControl>);
};

export const DateRangeFilter = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const defaultDateText = 'mm/dd/yyyy';

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStartDate(null);
    setEndDate(null);
  };

  const handleOK = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Created Date</FilterLabelText>
      <DateRangeButton onClick={handleClick} endIcon={<DateRangeFilterIcon />}>
        {startDate ? getDateText(startDate) : defaultDateText} - {endDate ? getDateText(endDate) : defaultDateText}
        {/*{defaultDateText}*/}
      </DateRangeButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <Card sx={{ maxWidth: '250px' }}>
          <CardContent>
            <Grid container rowGap={'18px'}>
              <DateFilterTitle item xs={12}>
                <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>Enter dates</Typography>
                <DateRangeIcon sx={{ fontSize: '24px' }} />
              </DateFilterTitle>
              <Grid item xs={12}>
                <DatePicker
                  label={'Start date'}
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  disableFuture
                  maxDate={endDate}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label={'End date'}
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  disableFuture
                  minDate={startDate}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleOK}>OK</Button>
          </CardActions>
        </Card>
      </Popover>
    </FormControl>

  );
};
