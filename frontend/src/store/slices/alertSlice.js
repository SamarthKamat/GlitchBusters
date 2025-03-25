import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alerts: [],
  notificationCount: 0
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      state.alerts.push({
        id: Date.now(),
        ...action.payload,
        read: false
      });
      state.notificationCount += 1;
    },
    removeAlert: (state, action) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      state.notificationCount = state.alerts.filter(alert => !alert.read).length;
    },
    markAlertAsRead: (state, action) => {
      const alert = state.alerts.find(alert => alert.id === action.payload);
      if (alert) {
        alert.read = true;
        state.notificationCount = state.alerts.filter(alert => !alert.read).length;
      }
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
      state.notificationCount = 0;
    }
  }
});

export const { addAlert, removeAlert, markAlertAsRead, clearAllAlerts } = alertSlice.actions;
export default alertSlice.reducer;