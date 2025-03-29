import API from "./api";

/**
 * Fetch the history of a specific product.
 * @param {string} productId - The ID of the product to fetch history for.
 * @returns {Promise<Object>} - The API response.
 */
export const getProductHistory = async (productId) => {
  try {
    const response = await API.get(`/tracking/history/${productId}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching product history:", error);
    throw error.response?.data?.error || "Failed to fetch product history. Please try again.";
  }
};

/**
 * Fetch the current status of a specific product.
 * @param {string} productId - The ID of the product to fetch status for.
 * @returns {Promise<Object>} - The API response.
 */
export const getProductStatus = async (productId) => {
  try {
    const response = await API.get(`/tracking/status/${productId}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching product status:", error);
    throw error.response?.data?.error || "Failed to fetch product status. Please try again.";
  }
};

/**
 * Update the storage conditions of a product.
 * @param {Object} data - The data containing product ID and storage conditions.
 * @returns {Promise<Object>} - The API response.
 */
export const updateStorageConditions = async (data) => {
  try {
    const response = await API.post(`/tracking/update-storage`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error updating storage conditions:", error);
    throw error.response?.data?.error || "Failed to update storage conditions. Please try again.";
  }
};

/**
 * Log transport details for a product batch.
 * @param {Object} data - The data containing batch ID and transport details.
 * @returns {Promise<Object>} - The API response.
 */
export const logTransportDetails = async (data) => {
  try {
    const response = await API.post(`/tracking/log-transport`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error logging transport details:", error);
    throw error.response?.data?.error || "Failed to log transport details. Please try again.";
  }
};

/**
 * Fetch batch details by batch ID.
 * @param {string} batchId - The ID of the batch to fetch details for.
 * @returns {Promise<Object>} - The API response.
 */
export const getBatchDetails = async (batchId) => {
  try {
    const response = await API.get(`/tracking/batch/${batchId}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching batch details:", error);
    throw error.response?.data?.error || "Failed to fetch batch details. Please try again.";
  }
};