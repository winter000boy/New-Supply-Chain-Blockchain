import API from "./api";

/**
 * Assign a role to a user.
 * @param {Object} data - The data containing the Ethereum address and role ID.
 * @returns {Promise} - The API response.
 */
export const assignRole = (data) => {
  return API.post(`/roles/assign`, data);
};

/**
 * Revoke a role from a user.
 * @param {Object} data - The data containing the Ethereum address.
 * @returns {Promise} - The API response.
 */
export const revokeRole = (data) => {
  return API.post(`/roles/revoke`, data);
};

/**
 * Fetch the role of a specific user.
 * @param {string} address - The Ethereum address of the user.
 * @returns {Promise} - The API response.
 */
export const getRole = (address) => {
  return API.get(`/roles/${address}`);
};

/**
 * Transfer admin privileges to another user.
 * @param {Object} data - The data containing the new admin's Ethereum address.
 * @returns {Promise} - The API response.
 */
export const transferAdmin = (data) => {
  return API.post(`/roles/transfer-admin`, data);
};