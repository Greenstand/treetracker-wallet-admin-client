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

    const responseBody = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
        responseBody?.message || `HTTP error! Status: ${response.status}`
      );
    }

    return responseBody;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTrustedWallets = async (token, senderWalletId) => {
  if (!senderWalletId) return [];

  try {
    const limit = 500;
    let offset = 0;
    let relationships = [];
    let hasMore = true;

    while (hasMore) {
      const response = await apiClient
        .setAuthHeader(token)
        .get(
          `/wallets/${senderWalletId}/trust_relationships?state=trusted&limit=${limit}&offset=${offset}`
        );
      const page = response.data.trust_relationships || [];
      const total = Number(response.data.total);

      relationships = [...relationships, ...page];
      offset += page.length;

      hasMore =
        page.length > 0 &&
        ((Number.isFinite(total) && relationships.length < total) ||
          (!Number.isFinite(total) && page.length === limit));
    }

    const trustedWallets = relationships
      .filter(
        (relationship) =>
          relationship.state === 'trusted' &&
          relationship.request_type === 'send' &&
          relationship.actor_wallet_id === senderWalletId
      )
      .map((relationship) => ({
        id: relationship.target_wallet_id,
        name: relationship.target_wallet,
        tokensInWallet: 0,
      }));

    return trustedWallets.filter(
      (trustedWallet, index, array) =>
        trustedWallet.name &&
        index === array.findIndex((item) => item.id === trustedWallet.id)
    );
  } catch (error) {
    console.error(error);
    throw Error('An error occurred while fetching trusted wallets.');
  }
};

export const getAllTrustedWallets = async (token) => {
  const wallet = JSON.parse(localStorage.getItem('wallet') || '{}');
  if (!wallet || !wallet.id) return [];

  try {
    const limit = 500;
    let offset = 0;
    let relationships = [];
    let hasMore = true;

    while (hasMore) {
      const response = await apiClient
        .setAuthHeader(token)
        .get(
          `/wallets/${wallet.id}/trust_relationships?state=trusted&limit=${limit}&offset=${offset}`
        );
      const page = response.data.trust_relationships || [];
      const total = Number(response.data.total);

      relationships = [...relationships, ...page];
      offset += page.length;

      hasMore =
        page.length > 0 &&
        ((Number.isFinite(total) && relationships.length < total) ||
          (!Number.isFinite(total) && page.length === limit));
    }

    const trustedWalletsMap = new Map();

    relationships.forEach((relationship) => {
      if (relationship.state !== 'trusted') return;

      const candidates = [
        { id: relationship.target_wallet_id, name: relationship.target_wallet },
        { id: relationship.actor_wallet_id, name: relationship.actor_wallet },
        { id: relationship.originator_wallet_id, name: relationship.originating_wallet },
      ];

      candidates.forEach((cand) => {
        if (cand.name && cand.name !== wallet.name && cand.id !== wallet.id) {
          if (!trustedWalletsMap.has(cand.name)) {
            trustedWalletsMap.set(cand.name, {
              id: cand.id || cand.name,
              name: cand.name,
              tokensInWallet: 0,
            });
          }
        }
      });
    });

    const trustedWallets = Array.from(trustedWalletsMap.values());
    trustedWallets.sort((a, b) => a.name.localeCompare(b.name));

    return trustedWallets;
  } catch (error) {
    console.error(error);
    throw Error('An error occurred while fetching all trusted wallets.');
  }
};

