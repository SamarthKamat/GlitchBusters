import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import foodReducer from './slices/foodSlice';
import alertReducer from './slices/alertSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    food: foodReducer,
    alert: alertReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;