import API from "./api";

/**
 * Fetch the history of a specific product.
 * @param {string} productId - The ID of the product to fetch history for.
 * @returns {Promise} - The API response.
 */
export const getProductHistory = (productId) => {
  return API.get(`/tracking/history/${productId}`);
};

/**
 * Fetch the current status of a specific product.
 * @param {string} productId - The ID of the product to fetch status for.
 * @returns {Promise} - The API response.
 */
export const getProductStatus = (productId) => {
  return API.get(`/tracking/status/${productId}`);
};

/**
 * Update the storage conditions of a product.
 * @param {Object} data - The data containing product ID and storage conditions.
 * @returns {Promise} - The API response.
 */
export const updateStorageConditions = (data) => {
  return API.post(`/tracking/update-storage`, data);
};