import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  CircularProgress,
  Alert,
  Tabs,
  Tab
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import axios from 'axios';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      website: '',
      description: ''
    }
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        organization: {
          name: user.organization?.name || '',
          address: user.organization?.address || '',
          city: user.organization?.city || '',
          state: user.organization?.state || '',
          zipCode: user.organization?.zipCode || '',
          website: user.organization?.website || '',
          description: user.organization?.description || ''
        }
      });
    }
  }, [user]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData({
        ...profileData,
        [parent]: {
          ...profileData[parent],
          [child]: value
        }
      });
    } else {
      setProfileData({
        ...profileData,
        [name]: value
      });
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    // Reset form data if canceling edit
    if (editMode) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        organization: {
          name: user.organization?.name || '',
          address: user.organization?.address || '',
          city: user.organization?.city || '',
          state: user.organization?.state || '',
          zipCode: user.organization?.zipCode || '',
          website: user.organization?.website || '',
          description: user.organization?.description || ''
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const response = await axios.put(
        '/api/users/profile',
        profileData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      // Update user in Redux store
      // This would require a proper action in your authSlice
      // dispatch(updateUserSuccess(response.data));
      
      setSuccess('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }}>
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
      
      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              mr: 2
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1">
              {user?.name || 'User Profile'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1) || 'User'}
            </Typography>
          </Box>
          <Box sx={{ ml: 'auto' }}>
            <Button
              variant={editMode ? "outlined" : "contained"}
              color={editMode ? "error" : "primary"}
              startIcon={editMode ? <CancelIcon /> : <EditIcon />}
              onClick={handleEditToggle}
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </Button>
          </Box>
        </Box>
        
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
        >
          <Tab label="Personal Information" />
          <Tab label="Organization Details" />
        </Tabs>
        
        <Box component="form" onSubmit={handleSubmit}>
          {/* Personal Information Tab */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  label="Full Name"
                  fullWidth
                  value={profileData.name}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="email"
                  label="Email Address"
                  fullWidth
                  value={profileData.email}
                  onChange={handleChange}
                  disabled={!editMode}
                  required
                  type="email"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="phone"
                  label="Phone Number"
                  fullWidth
                  value={profileData.phone}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
            </Grid>
          )}
          
          {/* Organization Details Tab */}
          {tabValue === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="organization.name"
                  label="Organization Name"
                  fullWidth
                  value={profileData.organization.name}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="organization.address"
                  label="Address"
                  fullWidth
                  value={profileData.organization.address}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="organization.city"
                  label="City"
                  fullWidth
                  value={profileData.organization.city}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="organization.state"
                  label="State/Province"
                  fullWidth
                  value={profileData.organization.state}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="organization.zipCode"
                  label="ZIP / Postal Code"
                  fullWidth
                  value={profileData.organization.zipCode}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="organization.website"
                  label="Website"
                  fullWidth
                  value={profileData.organization.website}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="organization.description"
                  label="Organization Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={profileData.organization.description}
                  onChange={handleChange}
                  disabled={!editMode}
                />
              </Grid>
            </Grid>
          )}
          
          {editMode && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile;