import API from "./api";

/**
 * Assign a role to a user.
 * @param {Object} data - The data containing the Ethereum address and role ID.
 * @returns {Promise<Object>} - The API response.
 */
export const assignRole = async (data) => {
  try {
    const response = await API.post(`/roles/assign`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error assigning role:", error);
    throw error.response?.data?.error || "Failed to assign role. Please try again.";
  }
};

/**
 * Revoke a role from a user.
 * @param {Object} data - The data containing the Ethereum address.
 * @returns {Promise<Object>} - The API response.
 */
export const revokeRole = async (data) => {
  try {
    const response = await API.post(`/roles/revoke`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error revoking role:", error);
    throw error.response?.data?.error || "Failed to revoke role. Please try again.";
  }
};

/**
 * Fetch the role of a user.
 * @param {string} address - The Ethereum address of the user.
 * @returns {Promise<Object>} - The API response containing the user's role.
 */
export const getRole = async (address) => {
  try {
    const response = await API.get(`/roles/${address}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching role:", error);
    throw error.response?.data?.error || "Failed to fetch role. Please try again.";
  }
};