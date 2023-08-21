import apiClient from '../utils/apiClient';
import { makeQueryString } from '../utils/formatting';

export const getTransfers = async (token, { pagination, filter }) => {
  try {
    const where = filter.getWhereObj();
    // pagination: limit, offset
    // where: wallet, status, before, after (possible options)
    const transferFilter = {
      ...pagination,
      ...where,
    };

    const queryString = makeQueryString(transferFilter);

    const response = await apiClient
      .setAuthHeader(token)
      .get(`/transfers?${queryString}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
