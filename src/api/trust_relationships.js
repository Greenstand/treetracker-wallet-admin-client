import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';
import secureLocalStorage from 'react-secure-storage';

export const getTrustRelationships = async (
  token,
  { pagination, filter, sorting }
) => {
  const { sort_by, order } = sorting;
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');

  try {
    const where = filter.getWhereObj();
    const trustRelationshipsFilter = {
      ...pagination,
      ...where,
      sort_by,
      order,
    };

    const queryString = makeQueryString(trustRelationshipsFilter);
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/wallets/${wallet.id}/trust_relationships?${queryString}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPendingTrustRelationships = async (token) => {
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/wallets/${wallet.id}/trust_relationships?state=requested`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const requestTrustRelationship = async (
  token,
  { requestType, requestingWallet, targetWallet }
) => {
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .post('/trust_relationships', {
        trust_request_type: requestType,
        requester_wallet: requestingWallet,
        requestee_wallet: targetWallet,
      });

    return response.data;
  } catch (error) {
    console.error(error);
    throw Error(
      'An error occurred while requesting the trust relationship: ' +
        error.response.data.message
    );
  }
};

export const acceptTrustRelationship = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/trust_relationships/${id}/accept`,
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

export const declineTrustRelationship = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/trust_relationships/${id}/decline`,
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

export const deleteTrustRelationship = async ({ id, token }) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WALLET_API_ROOT}/trust_relationships/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'TREETRACKER-API-KEY': secureLocalStorage.getItem('api-key') || '',
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
