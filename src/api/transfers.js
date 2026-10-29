import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';
import secureLocalStorage from 'react-secure-storage';

export const getTransfers = async (token, { pagination, filter, sorting }) => {
  try {
    const where = filter.getWhereObj();
    // pagination: limit, offset
    // where: wallet, status, before, after (possible options)
    const transferFilter = {
      ...pagination,
      ...where,
    };

    if (sorting) {
      const { sort_by, order } = sorting;
      if (sort_by) {
        transferFilter.sort_by = sort_by;
        transferFilter.order = order;
      }
    }

    const queryString = makeQueryString(transferFilter);

    const response = await apiClient
      .setAuthHeader(token)
      .get(`/transfers?${queryString}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPendingTransfers = async (token) => {
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/transfers?state=pending`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const acceptTransfer = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/transfers/${id}/accept`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TREETRACKER-API-KEY': secureLocalStorage.getItem('api-key') || '',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const declineTransfer = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/transfers/${id}/decline`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'TREETRACKER-API-KEY': secureLocalStorage.getItem('api-key') || '',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const cancelTransfer = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/transfers/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'TREETRACKER-API-KEY': secureLocalStorage.getItem('api-key') || '',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};