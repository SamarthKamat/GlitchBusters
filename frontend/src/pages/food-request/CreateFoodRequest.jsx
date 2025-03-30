import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, Autocomplete } from '@react-google-maps/api';

export const units = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'lbs', label: 'Lbs' },
  { value: 'pieces', label: 'Pieces' },
  { value: 'servings', label: 'Servings' },
  { value: 'boxes', label: 'Boxes' }
];

const CreateFoodRequest = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || user.role !== 'charity') {
      navigate('/food-requests');
    }
  }, [user, navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [autocomplete, setAutocomplete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    quantityRequested: '',
    unit: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMapClick = (e) => {
    setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleAutocompleteLoad = (auto) => {
    setAutocomplete(auto);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setLocation({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!location.lat || !location.lng) {
      setError('Please select a location on the map');
      setLoading(false);
      return;
    }

    const requestData = {
      ...formData,
      location: {
        lat: location.lat,
        lng: location.lng
      },
      quantityRequested: parseInt(formData.quantityRequested),
      status: 'pending'
    };

    try {
      await axios.post('http://localhost:5000/api/charity_request/create_request', requestData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      navigate('/food-requests')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Food Request
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <MenuItem value="produce">Produce</MenuItem>
                <MenuItem value="dairy">Dairy</MenuItem>
                <MenuItem value="bakery">Bakery</MenuItem>
                <MenuItem value="meat">Meat</MenuItem>
                <MenuItem value="prepared">Prepared</MenuItem>
                <MenuItem value="pantry">Pantry</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                required
              >
                {units.map((unit) => (
                  <MenuItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                label="Quantity Requested"
                name="quantityRequested"
                value={formData.quantityRequested}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Location
              </Typography>
              <LoadScript
                googleMapsApiKey="AIzaSyCOcIVYH1tYXH0L0ryQVcldisMyRNWrDYA"
                libraries={["places"]} // Add this line
              >
                <Autocomplete
                  onLoad={handleAutocompleteLoad}
                  onPlaceChanged={handlePlaceChanged}
                >
                  <TextField
                    fullWidth
                    label="Search Location"
                    placeholder="Type a location"
                    variant="outlined"
                  />
                </Autocomplete>
                <GoogleMap
                  mapContainerStyle={{ height: '400px', width: '100%' }}
                  center={location.lat && location.lng ? location : { lat: 0, lng: 0 }}
                  zoom={location.lat && location.lng ? 15 : 2}
                  onClick={handleMapClick}
                >
                  {location.lat && location.lng && <Marker position={location} />}
                </GoogleMap>
              </LoadScript>
              {location.lat && location.lng && (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  Selected Location: Latitude {location.lat}, Longitude {location.lng}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/food-requests')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Create Request'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateFoodRequest;