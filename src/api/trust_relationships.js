import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';

export const getTrustRelationships = async (token, {pagination}) => {
  try {
    // const where = filter.getWhereObj();
    const trustRelationshipsFilter = {
      ...pagination,
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