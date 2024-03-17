import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';

export const getTrustRelationships = async (token, {pagination, filter}) => {
  try {
    const where = filter.getWhereObj();
    const trustRelationshipsFilter = {
      ...pagination,
      ...where
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


export const  acceptTrustRelationship = async ({id, token}) => {
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/trust_relationships/${id}/accept`);
    return response;
  } catch (error) {
    console.error(error);
  }
}


export const  declineTrustRelationship = async ({id, token}) => {
  try {
    const response = await apiClient
      .setAuthHeader(token)
      .get(`/trust_relationships/${id}/decline`);
    return response;
  } catch (error) {
    console.error(error);
  }
}