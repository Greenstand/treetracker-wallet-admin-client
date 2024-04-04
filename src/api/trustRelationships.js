import apiClient from '../utils/apiClient';

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
