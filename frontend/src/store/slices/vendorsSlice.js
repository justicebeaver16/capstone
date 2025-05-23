import { csrfFetch } from '../csrf';

// Action Types
const GET_ALL_VENDORS = 'vendors/getAllVendors';
const CREATE_VENDOR = 'vendors/createVendor';
const UPDATE_VENDOR = 'vendors/updateVendor';
const DELETE_VENDOR = 'vendors/deleteVendor';

// Action Creators
const getAllVendors = (vendors) => ({ type: GET_ALL_VENDORS, vendors });
const createVendor = (vendor) => ({ type: CREATE_VENDOR, vendor });
const updateVendor = (vendor) => ({ type: UPDATE_VENDOR, vendor });
const deleteVendor = (vendorId) => ({ type: DELETE_VENDOR, vendorId });

// Thunks
export const getAllVendorsThunk = () => async (dispatch) => {
  const response = await csrfFetch('/api/vendors');
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllVendors(data));
    return data;
  }
};

export const createVendorThunk = (vendorData) => async (dispatch) => {
  const response = await csrfFetch('/api/vendors', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendorData),
  });
  if (response.ok) {
    const newVendor = await response.json();
    dispatch(createVendor(newVendor));
    return newVendor;
  }
};

export const updateVendorThunk = (vendorData, vendorId) => async (dispatch) => {
  const response = await csrfFetch(`/api/vendors/${vendorId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(vendorData),
  });
  if (response.ok) {
    const updatedVendor = await response.json();
    dispatch(updateVendor(updatedVendor));
    return updatedVendor;
  }
};

export const deleteVendorThunk = (vendorId) => async (dispatch) => {
  const response = await csrfFetch(`/api/vendors/${vendorId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    dispatch(deleteVendor(vendorId));
    return vendorId;
  }
};

// Initial State & Reducer
const initialState = { allVendors: {} };

const vendorsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_VENDORS: {
      const newState = { allVendors: {} };
      if (Array.isArray(action.vendors)) {
        action.vendors.forEach((vendor) => {
          newState.allVendors[vendor.id] = vendor;
        });
      }
      return newState;
    }
    case CREATE_VENDOR:
    case UPDATE_VENDOR: {
      return {
        ...state,
        allVendors: {
          ...state.allVendors,
          [action.vendor.id]: action.vendor,
        },
      };
    }
    case DELETE_VENDOR: {
      const newState = {
        ...state,
        allVendors: { ...state.allVendors },
      };
      delete newState.allVendors[action.vendorId];
      return newState;
    }
    default:
      return state;
  }
};

// Selectors
export const selectAllVendors = (state) => Object.values(state.vendors.allVendors || {});

export const selectVendorsByCategory = (category) => (state) =>
  selectAllVendors(state).filter((vendor) => vendor.category === category);

export const selectVendorsByStatus = (status) => (state) =>
  selectAllVendors(state).filter((vendor) => vendor.status === status);

export const selectVendorsByRating = (minRating) => (state) =>
  selectAllVendors(state).filter((vendor) => vendor.rating >= minRating);

export const selectVendorsByTag = (tag) => (state) =>
  selectAllVendors(state).filter((vendor) => Array.isArray(vendor.tags) && vendor.tags.includes(tag));

export const selectVendorsForEvent = (eventId) => (state) =>
  selectAllVendors(state).filter((vendor) => vendor.EventId === eventId);

export default vendorsReducer;