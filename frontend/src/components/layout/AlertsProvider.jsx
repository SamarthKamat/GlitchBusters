import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import alertService from '../../services/alertService';
import store from '../../store';

// This component initializes the alert service and manages its lifecycle
const AlertsProvider = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Only initialize the alert service if the user is authenticated
    if (isAuthenticated) {
      // Initialize the alert service with the Redux store
      alertService.init(store);

      // Cleanup function to disconnect when component unmounts
      return () => {
        alertService.disconnect();
      };
    }
  }, [isAuthenticated]);

  // This component doesn't render anything itself, it just initializes the service
  return <>{children}</>;
};

export default AlertsProvider;