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

/**@function
 * @name TransferFilter
 * @description Renders the transfer status filter
 *
 * @param {object} statusList Array of transfer status objects
 * @param {function} getStatusColor returns color corresponding to transfer state value
 *
 * @return {JSX.Element} Transfer status filter component
 * @constructor
 */
export const TransferFilter = ({ statusList, getStatusColor }) => {

  // get filter from context
  const { filter, setFilter } = useTransfersContext();
  const { transferStatus } = filter;

  const handleSelectChange = (e) => {
    const newFilter = { ...filter, transferStatus: e.target.value };
    setFilter(newFilter);
  };

  return (
    <FormControl sx={{ width: '192px' }}>
      <FilterLabelText>Transfer Status</FilterLabelText>

      <SelectFilter
        displayEmpty
        value={transferStatus}
        onChange={handleSelectChange}
        IconComponent={ArrowDropDownIcon}
        sx={{
          color: transferStatus ? getStatusColor(transferStatus) : '#585B5D',
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
  const { startDate, endDate } = filter;

  const handleStartDateChange = (date) => {
    const newFilter = { ...filter, startDate: date };
    setFilter(newFilter);
  };

  const handleEndDateChange = (date) => {
    const newFilter = { ...filter, endDate: date };
    setFilter(newFilter);
  };


  const [anchorEl, setAnchorEl] = useState(null);
  const defaultDateText = 'mm/dd/yyyy';

  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
    const newFilter = { ...filter, startDate: null, endDate: null };
    setFilter(newFilter);
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
                  onChange={(date) => handleStartDateChange(date)}
                  disableFuture
                  maxDate={endDate}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label={'End date'}
                  value={endDate}
                  onChange={(date) => handleEndDateChange(date)}
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
