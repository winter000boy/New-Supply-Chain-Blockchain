import API from "./api";

/**
 * Add a new medicine to the supply chain.
 * @param {Object} data - The data containing medicine details.
 * @returns {Promise<Object>} - The API response.
 */
export const addMedicine = async (data) => {
  try {
    const response = await API.post(`/medicine/add`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error adding medicine:", error);
    throw error.response?.data?.error || "Failed to add medicine. Please try again.";
  }
};

/**
 * Fetch the list of all medicines.
 * @returns {Promise<Object>} - The API response.
 */
export const getMedicines = async () => {
  try {
    const response = await API.get(`/medicine`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching medicines:", error);
    throw error.response?.data?.error || "Failed to fetch medicines. Please try again.";
  }
};

/**
 * Fetch details of a specific medicine.
 * @param {string} medicineId - The ID of the medicine to fetch details for.
 * @returns {Promise<Object>} - The API response.
 */
export const getMedicineDetails = async (medicineId) => {
  try {
    const response = await API.get(`/medicine/${medicineId}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching medicine details:", error);
    throw error.response?.data?.error || "Failed to fetch medicine details. Please try again.";
  }
};

/**
 * Update manufacturing details for a specific medicine.
 * @param {Object} data - The data containing medicine ID and manufacturing details.
 * @returns {Promise<Object>} - The API response.
 */
export const updateManufacturingDetails = async (data) => {
  try {
    const response = await API.post(`/medicine/update-manufacturing`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error updating manufacturing details:", error);
    throw error.response?.data?.error || "Failed to update manufacturing details. Please try again.";
  }
};

/**
 * Update storage details for a specific batch.
 * @param {Object} data - The data containing batch ID and storage details.
 * @returns {Promise<Object>} - The API response.
 */
export const updateStorageDetails = async (data) => {
  try {
    const response = await API.post(`/medicine/update-storage`, data);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error updating storage details:", error);
    throw error.response?.data?.error || "Failed to update storage details. Please try again.";
  }
};

/**
 * Fetch batch details by batch ID.
 * @param {string} batchId - The ID of the batch to fetch details for.
 * @returns {Promise<Object>} - The API response.
 */
export const getBatchDetails = async (batchId) => {
  try {
    const response = await API.get(`/medicine/batch/${batchId}`);
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching batch details:", error);
    throw error.response?.data?.error || "Failed to fetch batch details. Please try again.";
  }
};