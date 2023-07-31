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
import { useTransfersContext } from '../../store/TransfersContext';
import TransferFilter from '../../models/TransferFilter';

/**@function
 * @name TransferFilter
 * @description Renders the transfer status filter
 *
 * @param {function} getStatusColor returns color corresponding to transfer state value
 *
 * @return {JSX.Element} Transfer status filter component
 * @constructor
 */
export const TransferSelectFilter = ({ getStatusColor }) => {

  // get filter from context
  const { filter, setFilter, statusList } = useTransfersContext();
  const { status } = filter;

  const handleSelectChange = (e) => {
    const newFilter = new TransferFilter({ ...filter, status: e.target.value });
    setFilter(newFilter);
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Transfer Status</FilterLabelText>

      <SelectFilter
        displayEmpty
        value={status}
        onChange={handleSelectChange}
        IconComponent={ArrowDropDownIcon}
        sx={{
          color: status ? getStatusColor(status) : '#585B5D',
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

/**@function
 * @name DateRangeFilter
 * @description Renders the date range filter
 *
 * @return {JSX.Element} Date range filter component
 * @constructor
 */
export const DateRangeFilter = () => {
  // get filter from context
  const { filter, setFilter } = useTransfersContext();
  const { after, before } = filter;

  const handleStartDateChange = (date) => {
    const newFilter = new TransferFilter({ ...filter, after: date });
    setFilter(newFilter);
  };

  const handleEndDateChange = (date) => {
    const newFilter = new TransferFilter({ ...filter, before: date });
    setFilter(newFilter);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const defaultDateText = 'mm/dd/yyyy';

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const newFilter = new TransferFilter({ ...filter, before: null, after: null });
    setFilter(newFilter);
  };

  const handleOK = () => {
    setAnchorEl(null);
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Created Date</FilterLabelText>
      <DateRangeButton onClick={handleClick} endIcon={<DateRangeFilterIcon />}>
        {after ? getDateText(after) : defaultDateText} - {before ? getDateText(before) : defaultDateText}
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
                  value={after}
                  onChange={(date) => handleStartDateChange(date)}
                  disableFuture
                  maxDate={before}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label={'End date'}
                  value={before}
                  onChange={(date) => handleEndDateChange(date)}
                  disableFuture
                  minDate={after}
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
