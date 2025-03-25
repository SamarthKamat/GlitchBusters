import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  CircularProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import axios from 'axios';

const Settings = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [settingsData, setSettingsData] = useState({
    password: '',
    confirmPassword: '',
    notifications: {
      email: true,
      app: true,
      foodListings: true,
      deliveryUpdates: true
    },
    privacy: {
      showProfile: true,
      showContact: false
    }
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    const isCheckbox = e.target.type === 'checkbox';
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettingsData({
        ...settingsData,
        [parent]: {
          ...settingsData[parent],
          [child]: isCheckbox ? checked : value
        }
      });
    } else {
      setSettingsData({
        ...settingsData,
        [name]: isCheckbox ? checked : value
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validatePasswordForm = () => {
    if (settingsData.password && settingsData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    
    if (settingsData.password !== settingsData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validatePasswordForm()) return;
    
    try {
      await axios.put(
        '/api/users/password',
        { password: settingsData.password },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      setSuccess('Password updated successfully');
      setSettingsData({
        ...settingsData,
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update password');
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await axios.put(
        '/api/users/notifications',
        { notifications: settingsData.notifications },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      setSuccess('Notification preferences updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update notification preferences');
    }
  };

  const handlePrivacySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      await axios.put(
        '/api/users/privacy',
        { privacy: settingsData.privacy },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      setSuccess('Privacy settings updated successfully');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update privacy settings');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      
      <Typography variant="h4" component="h1" gutterBottom>
        Account Settings
      </Typography>
      
      <Grid container spacing={3}>
        {/* Security Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <SecurityIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Security</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handlePasswordSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={settingsData.password}
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <Button
                          onClick={toggleShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </Button>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="confirmPassword"
                    label="Confirm New Password"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    value={settingsData.confirmPassword}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    disabled={!settingsData.password || !settingsData.confirmPassword}
                  >
                    Update Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <NotificationsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handleNotificationSubmit}>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Email Notifications" 
                    secondary="Receive notifications via email"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="notifications.email"
                        checked={settingsData.notifications.email}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="App Notifications" 
                    secondary="Receive in-app notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="notifications.app"
                        checked={settingsData.notifications.app}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Food Listing Updates" 
                    secondary="Get notified about new food listings"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="notifications.foodListings"
                        checked={settingsData.notifications.foodListings}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Delivery Updates" 
                    secondary="Get notified about delivery status changes"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="notifications.deliveryUpdates"
                        checked={settingsData.notifications.deliveryUpdates}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Save Notification Settings
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
        
        {/* Privacy Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <VisibilityIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6">Privacy</Typography>
            </Box>
            <Divider sx={{ mb: 3 }} />
            
            <Box component="form" onSubmit={handlePrivacySubmit}>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Profile Visibility" 
                    secondary="Allow others to view your profile information"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="privacy.showProfile"
                        checked={settingsData.privacy.showProfile}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Contact Information" 
                    secondary="Show your contact information to other users"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        name="privacy.showContact"
                        checked={settingsData.privacy.showContact}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </ListItem>
              </List>
              
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  Save Privacy Settings
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;