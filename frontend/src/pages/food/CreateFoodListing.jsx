import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  CircularProgress,
  Alert,
  Stack
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import enUS from 'date-fns/locale/en-US';
import { format } from 'date-fns';
import {
  createFoodListingStart,
  createFoodListingSuccess,
  createFoodListingFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

const CreateFoodListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.food);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantity: '',
    unit: 'kg',
    expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    pickupTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    pickupAddress: user?.organization?.address || '',
    safetyInfo: '',
    notes: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const categories = [
    { value: 'produce', label: 'Produce' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'meat', label: 'Meat' },
    { value: 'prepared', label: 'Prepared Food' },
    { value: 'canned', label: 'Canned Goods' },
    { value: 'dry', label: 'Dry Goods' }
  ];

  const units = [
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'g', label: 'Grams (g)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'oz', label: 'Ounces (oz)' },
    { value: 'l', label: 'Liters (L)' },
    { value: 'ml', label: 'Milliliters (mL)' },
    { value: 'servings', label: 'Servings' },
    { value: 'items', label: 'Items' },
    { value: 'packages', label: 'Packages' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.quantity) errors.quantity = 'Quantity is required';
    if (isNaN(Number(formData.quantity)) || Number(formData.quantity) <= 0) {
      errors.quantity = 'Quantity must be a positive number';
    }
    if (!formData.unit) errors.unit = 'Unit is required';
    if (!formData.pickupAddress.trim()) errors.pickupAddress = 'Pickup address is required';
    
    // Validate dates
    const now = new Date();
    if (!formData.expiryDate) {
      errors.expiryDate = 'Expiry date is required';
    } else if (formData.expiryDate < now) {
      errors.expiryDate = 'Expiry date cannot be in the past';
    }
    
    if (!formData.pickupTime) {
      errors.pickupTime = 'Pickup time is required';
    } else if (formData.pickupTime < now) {
      errors.pickupTime = 'Pickup time cannot be in the past';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      dispatch(createFoodListingStart());
      
      const response = await axios.post(
        '/api/food',
        {
          ...formData,
          expiryDate: format(formData.expiryDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
          pickupTime: format(formData.pickupTime, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      dispatch(createFoodListingSuccess(response.data));
      navigate(`/food-listings/${response.data._id}`);
    } catch (error) {
      dispatch(createFoodListingFailure(error.message));
    }
  };

  if (user?.role !== 'business') {
    return (
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, width: '100%' }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" color="error" gutterBottom>
            Access Denied
          </Typography>
          <Typography variant="body1">
            Only business accounts can create food listings.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/food-listings')}
            sx={{ mt: 3 }}
          >
            Back to Listings
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4, width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Food Listing
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={formData.title}
                onChange={handleChange}
                error={!!formErrors.title}
                helperText={formErrors.title}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                error={!!formErrors.description}
                helperText={formErrors.description}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!formErrors.category} required>
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category.value} value={category.value}>
                      {category.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.category && (
                  <FormHelperText>{formErrors.category}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <TextField
                name="quantity"
                label="Quantity"
                fullWidth
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                error={!!formErrors.quantity}
                helperText={formErrors.quantity}
                required
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth error={!!formErrors.unit} required>
                <InputLabel id="unit-label">Unit</InputLabel>
                <Select
                  labelId="unit-label"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  label="Unit"
                >
                  {units.map((unit) => (
                    <MenuItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.unit && (
                  <FormHelperText>{formErrors.unit}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
                <DateTimePicker
                  label="Expiry Date"
                  value={formData.expiryDate}
                  onChange={(date) => handleDateChange('expiryDate', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!formErrors.expiryDate,
                      helperText: formErrors.expiryDate
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
                <DateTimePicker
                  label="Pickup Time"
                  value={formData.pickupTime}
                  onChange={(date) => handleDateChange('pickupTime', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      error: !!formErrors.pickupTime,
                      helperText: formErrors.pickupTime
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="pickupAddress"
                label="Pickup Address"
                fullWidth
                value={formData.pickupAddress}
                onChange={handleChange}
                error={!!formErrors.pickupAddress}
                helperText={formErrors.pickupAddress}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="safetyInfo"
                label="Safety Information"
                fullWidth
                multiline
                rows={2}
                value={formData.safetyInfo}
                onChange={handleChange}
                placeholder="Storage requirements, allergens, etc."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="notes"
                label="Additional Notes"
                fullWidth
                multiline
                rows={2}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional information for the recipient"
              />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/food-listings')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Create Listing'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateFoodListing;