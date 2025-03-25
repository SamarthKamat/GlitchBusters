import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodListings: [],
  selectedListing: null,
  loading: false,
  error: null,
  stats: {
    overall: {
      totalQuantity: 0,
      totalDonations: 0,
      categories: []
    },
    monthly: []
  },
  filters: {
    category: '',
    dietary: '',
    status: 'available'
  }
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    getFoodListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getFoodListingsSuccess: (state, action) => {
      state.loading = false;
      state.foodListings = action.payload;
    },
    getFoodListingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedListing: (state, action) => {
      state.selectedListing = action.payload;
    },
    createFoodListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createFoodListingSuccess: (state, action) => {
      state.loading = false;
      state.foodListings.unshift(action.payload);
    },
    createFoodListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFoodListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateFoodListingSuccess: (state, action) => {
      state.loading = false;
      const index = state.foodListings.findIndex(listing => listing._id === action.payload._id);
      if (index !== -1) {
        state.foodListings[index] = action.payload;
      }
      if (state.selectedListing?._id === action.payload._id) {
        state.selectedListing = action.payload;
      }
    },
    updateFoodListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getStatsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getStatsSuccess: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },
    getStatsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure,
  setSelectedListing,
  createFoodListingStart,
  createFoodListingSuccess,
  createFoodListingFailure,
  updateFoodListingStart,
  updateFoodListingSuccess,
  updateFoodListingFailure,
  getStatsStart,
  getStatsSuccess,
  getStatsFailure,
  setFilters,
  clearError
} = foodSlice.actions;

export default foodSlice.reducer;