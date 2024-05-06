import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';

export const getTrustRelationships = async (
  token,
  { pagination, filter, sorting }
) => {
  const { sort_by, order } = sorting;

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
      .get(`/trust_relationships?${queryString}`);
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
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/trust_relationships/${id}/accept`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const declineTrustRelationship = async ({ id, token }) => {
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/trust_relationships/${id}/decline`);
    return response;
  } catch (error) {
    console.error(error);
  }
};
