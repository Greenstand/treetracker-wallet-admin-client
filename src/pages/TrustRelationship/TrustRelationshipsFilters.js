/* eslint-disable no-unused-vars */
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
    FilterLabelText,
    SelectFilter,
    SelectMenuItem,
  } from './TrutrelationshipsFilter.styled';

  import React, { useEffect, useState } from 'react';
  import TransferFilter from '../../models/TransferFilter';
  
  /**@function
   * @name StateSelectFilter
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



export const StateSelectFilter = ({ filter, setFilter, statesList, getStatusColor }) => {
    // get state from filter
    const { state } = filter;
  
    const handleSelectChange = (e) => {
      const newFilter = new TransferFilter({ ...filter, state: e.target.value });
      setFilter(newFilter);
    };
  
    return (
      <FormControl sx={{ width: '192px', marginBottom: '10px' }} data-testid='transfer-status-filter'>
        <FilterLabelText>State</FilterLabelText>
  
        <SelectFilter
          displayEmpty
          value={state}
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
          sx={{
            color: '#585B5D',
            marginTop: '10px',
          }}
        >
          <SelectMenuItem value={''}>All</SelectMenuItem>
  
          {statesList.map((val, index) => {
            return (
              <SelectMenuItem
                key={index}
                value={val.value}
                sx={{ color: val.color }}
              >
                {val.label}
              </SelectMenuItem>
            );
          })}
        </SelectFilter>
      </FormControl>
    );
  };







  export const RequestTypeSelectFilter = ({ filter, setFilter, requestTypeList, getStatusColor }) => {
    // get state from filter
    const { requestType } = filter;
  
    const handleSelectChange = (e) => {
      const newFilter = new TransferFilter({ ...filter, requestType: e.target.value });
      setFilter(newFilter);
    };
  
    return (
      <FormControl sx={{ width: '192px', marginBottom: '10px' }} data-testid='transfer-status-filter'>
        <FilterLabelText>Request Type</FilterLabelText>
  
        <SelectFilter
          displayEmpty
          value={requestType}
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
          sx={{
            color: '#585B5D',
            marginTop: '10px',
          }}
        >
          <SelectMenuItem value={''}>All</SelectMenuItem>
  
          {requestTypeList.map((state, index) => {
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
  









  
  export const TypeSelectFilter = ({ filter, setFilter, typeList, getStatusColor }) => {
    // get state from filter
    const { type } = filter;
  
    const handleSelectChange = (e) => {
      const newFilter = new TransferFilter({ ...filter, type: e.target.value });
      setFilter(newFilter);
    };
  
    return (
      <FormControl sx={{ width: '192px' }} data-testid='transfer-status-filter'>
        <FilterLabelText>Type</FilterLabelText>
  
        <SelectFilter
          displayEmpty
          value={type}
          onChange={handleSelectChange}
          IconComponent={ArrowDropDownIcon}
          sx={{
            color: '#585B5D',
            marginTop: '10px',
          }}
        >
          <SelectMenuItem value={''}>All</SelectMenuItem>
  
          {typeList.map((state, index) => {
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
  

  export const ResetButton = ({ setFilter, defaultFilter, close }) => {
    return (
      <button
        onClick={() => {setFilter(defaultFilter); close()}}
        type='button'
        style={{ 
          color: 'rgb(255, 128, 0)',
          border: 'none',
          background: 'transparent',
          fontWeight: '400', 
         }}
        data-testid='reset-filters'
      >
        <h4>Clear Filters</h4>
      </button>
    );
  };
