import axios from 'axios';
import { addAlert } from '../store/slices/alertSlice';

// This service handles real-time alerts and notifications
class AlertService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.store = null;
  }

  // Initialize the service with Redux store for dispatching actions
  init(store) {
    this.store = store;
    this.connectToSocket();

    // Setup event listeners for food-related events
    this.setupFoodListingListeners();
    
    return this;
  }

  // Connect to WebSocket server
  connectToSocket() {
    // In a real application, this would connect to a WebSocket server
    // For now, we'll simulate WebSocket events with setTimeout
    console.log('Connecting to notification service...');
    this.isConnected = true;
    
    // Simulate connection established
    setTimeout(() => {
      console.log('Connected to notification service');
      // Dispatch a system notification that connection is established
      this.dispatchAlert({
        type: 'info',
        title: 'Connected to Notification Service',
        message: 'You will now receive real-time updates about food donations and important announcements.',
        timestamp: new Date().getTime()
      });
    }, 1000);
  }

  // Setup listeners for food-related events
  setupFoodListingListeners() {
    // In a real application, these would be WebSocket event listeners
    // For now, we'll simulate events with setInterval
    
    // Simulate new food listing notifications
    setInterval(() => {
      if (this.isConnected && Math.random() > 0.7) {
        const foodTypes = ['Produce', 'Dairy', 'Bakery', 'Prepared Meals', 'Canned Goods'];
        const randomFood = foodTypes[Math.floor(Math.random() * foodTypes.length)];
        const randomQuantity = Math.floor(Math.random() * 50) + 5;
        
        this.dispatchAlert({
          type: 'food',
          title: 'New Food Donation Available',
          message: `${randomQuantity}kg of ${randomFood} is now available for claim. Act quickly before it expires!`,
          timestamp: new Date().getTime(),
          data: {
            foodType: randomFood,
            quantity: randomQuantity,
            listingId: `listing-${Date.now()}`
          }
        });
      }
    }, 45000); // Every 45 seconds
    
    // Simulate regulatory alerts
    setInterval(() => {
      if (this.isConnected && Math.random() > 0.8) {
        const regulatoryAlerts = [
          {
            type: 'warning',
            title: 'Temperature Advisory',
            message: 'Due to high temperatures, ensure all perishable items are transported in refrigerated vehicles.',
          },
          {
            type: 'info',
            title: 'New Donation Guidelines',
            message: 'Updated guidelines for prepared food donations now require detailed ingredient lists.',
          },
          {
            type: 'warning',
            title: 'Food Safety Alert',
            message: 'Recent inspections found improper handling of dairy products. Please review safety protocols.',
          }
        ];
        
        const randomAlert = regulatoryAlerts[Math.floor(Math.random() * regulatoryAlerts.length)];
        this.dispatchAlert({
          ...randomAlert,
          timestamp: new Date().getTime()
        });
      }
    }, 60000); // Every 60 seconds
    
    // Simulate success notifications
    setInterval(() => {
      if (this.isConnected && Math.random() > 0.75) {
        const successMessages = [
          {
            type: 'success',
            title: 'Donation Successfully Delivered',
            message: 'A recent food donation has been successfully delivered to its destination.',
          },
          {
            type: 'success',
            title: 'Impact Milestone Reached',
            message: 'Your community has saved over 3000kg of food from going to waste this month!',
          }
        ];
        
        const randomSuccess = successMessages[Math.floor(Math.random() * successMessages.length)];
        this.dispatchAlert({
          ...randomSuccess,
          timestamp: new Date().getTime()
        });
      }
    }, 90000); // Every 90 seconds
  }

  // Dispatch alert to Redux store
  dispatchAlert(alert) {
    if (this.store) {
      this.store.dispatch(addAlert(alert));
    } else {
      console.error('Store not initialized for AlertService');
    }
  }

  // Disconnect from WebSocket server
  disconnect() {
    console.log('Disconnecting from notification service...');
    this.isConnected = false;
    // Clear any pending reconnect attempts
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }
  }
}

// Create a singleton instance
const alertService = new AlertService();

export default alertService;