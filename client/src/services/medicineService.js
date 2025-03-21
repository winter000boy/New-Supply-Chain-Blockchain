import API from "./api";

/**
 * Add a new medicine to the supply chain.
 * @param {Object} data - The data containing medicine details.
 * @returns {Promise} - The API response.
 */
export const addMedicine = (data) => {
  return API.post(`/medicine/add`, data);
};

/**
 * Fetch the list of all medicines.
 * @returns {Promise} - The API response.
 */
export const getMedicines = () => {
  return API.get(`/medicine`);
};

/**
 * Fetch details of a specific medicine.
 * @param {string} medicineId - The ID of the medicine to fetch details for.
 * @returns {Promise} - The API response.
 */
export const getMedicineDetails = (medicineId) => {
  return API.get(`/medicine/${medicineId}`);
};

/**
 * Update manufacturing details for a specific medicine.
 * @param {Object} data - The data containing medicine ID and manufacturing details.
 * @returns {Promise} - The API response.
 */
export const updateManufacturingDetails = (data) => {
  return API.post(`/medicine/update-manufacturing`, data);
};