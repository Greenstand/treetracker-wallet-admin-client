import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  Popover,
  Typography,
} from '@mui/material';
import {
  ArrowDropDownIcon,
  DateFilterTitle,
  FilterLabelText,
  SelectFilter,
  SelectMenuItem,
  DateRangeButton,
  DateRangeFilterIcon,
  FilterResetButton,
} from './TableFilters.styled';
import React, { useEffect, useState } from 'react';
import { DatePicker, DateRangeIcon } from '@mui/x-date-pickers';
import { getDateText } from '../../utils/formatting';
import TransferFilter from '../../models/TransferFilter';

/**@function
 * @name TransferFilter
 * @description Renders the transfer status filter
 *
 * @param filter
 * @param setFilter
 * @param statusList
 * @param {function} getStatusColor returns color corresponding to transfer state value
 *
 * @return {JSX.Element} Transfer status filter component
 * @constructor
 */
export const TransferSelectFilter = ({
  filter,
  setFilter,
  statusList,
  getStatusColor,
}) => {
  // get state from filter
  const { state } = filter;

  const handleSelectChange = (e) => {
    const newFilter = new TransferFilter({ ...filter, state: e.target.value });
    setFilter(newFilter);
  };

  return (
    <FormControl sx={{ width: '192px' }} data-testid="transfer-status-filter">
      <FilterLabelText>Transfer Status</FilterLabelText>

      <SelectFilter
        displayEmpty
        value={state}
        onChange={handleSelectChange}
        IconComponent={ArrowDropDownIcon}
        sx={{
          color: state ? getStatusColor(state) : '#585B5D',
        }}
      >
        <SelectMenuItem value={''}>All</SelectMenuItem>

        {statusList.map((state, index) => {
          return (
            <SelectMenuItem
              key={index}
              value={state.value}
              sx={{ color: state.color }}
            >
              {state.label}
            </SelectMenuItem>
          );
        })}
      </SelectFilter>
    </FormControl>
  );
};

/**@function
 * @name DateRangeFilter
 * @description Renders the date range filter
 *
 * @return {JSX.Element} Date range filter component
 * @constructor
 */
export const DateRangeFilter = ({ filter, setFilter }) => {
  // start and end dates (from filter)
  const { after, before } = filter;

  // start and end dates (for datepicker display)
  // they are dayjs date objects
  // set as after and before in case there is default value
  const [startDate, setStartDate] = useState(after);
  const [endDate, setEndDate] = useState(before);

  // disable OK button on either datepicker error
  const [isStartDateError, setIsStartDateError] = useState(false);
  const [isEndDateError, setIsEndDateError] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const defaultDateText = 'mm/dd/yyyy';
  // MM/DD/YYYY format is used to convert date object to text
  const dateFormat = defaultDateText.toUpperCase();

  // update start and end dates when filter reset button is clicked
  useEffect(() => {
    setStartDate(after);
    setEndDate(before);
  }, [after, before]);

  // opens the popover
  const handleClick = (e) => {
    setAnchorEl(e.target);
  };

  // resets dates to previously present values and closes the popover
  const handleClose = () => {
    setStartDate(after);
    setEndDate(before);
    setAnchorEl(null);
  };

  // updates the filter object and closes the popover
  const handleOK = () => {
    const newFilter = new TransferFilter({
      ...filter,
      after: startDate,
      before: endDate,
    });
    setFilter(newFilter);

    setAnchorEl(null);
  };

  return (
    <FormControl sx={{ width: '192px' }} data-testid="date-range-filter">
      <FilterLabelText>Created Date</FilterLabelText>
      <DateRangeButton onClick={handleClick} endIcon={<DateRangeFilterIcon />}>
        {startDate ? getDateText(startDate, dateFormat) : defaultDateText} -{' '}
        {endDate ? getDateText(endDate, dateFormat) : defaultDateText}
      </DateRangeButton>
      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Card sx={{ maxWidth: '250px' }}>
          <CardContent>
            <Grid container rowGap={'18px'}>
              <DateFilterTitle item xs={12}>
                <Typography sx={{ fontSize: '24px', fontWeight: '700' }}>
                  Enter dates
                </Typography>
                <DateRangeIcon sx={{ fontSize: '24px' }} />
              </DateFilterTitle>
              <Grid item xs={12}>
                <DatePicker
                  label={'Start date'}
                  value={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setIsStartDateError(false);
                  }}
                  disableFuture
                  maxDate={endDate}
                  onError={(error) => {
                    setIsStartDateError(!!error);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  label={'End date'}
                  value={endDate}
                  onChange={(date) => {
                    setEndDate(date);
                    setIsEndDateError(false);
                  }}
                  disableFuture
                  minDate={startDate}
                  onError={(error) => setIsEndDateError(!!error)}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              onClick={handleOK}
              disabled={isStartDateError || isEndDateError}
            >
              OK
            </Button>
          </CardActions>
        </Card>
      </Popover>
    </FormControl>
  );
};

export const ResetButton = ({ setFilter, defaultFilter }) => {
  return (
    <FilterResetButton
      onClick={() => setFilter(defaultFilter)}
      type="button"
      variant="contained"
      color="primary"
      data-testid="reset-filters"
    >
      Reset
    </FilterResetButton>
  );
};
