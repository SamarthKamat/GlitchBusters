import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Stack,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from '@mui/material';
import {
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  Info as InfoIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import '@mui/x-date-pickers/AdapterDateFns';
import {
  updateFoodListingStart,
  updateFoodListingSuccess,
  updateFoodListingFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

const FoodListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  
  const [listing, setListing] = useState(null);
  const [claimDialog, setClaimDialog] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    deliveryAddress: '',
    notes: ''
  });
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchListing = async () => {
      // First check if we already have the listing in our Redux store
      const existingListing = foodListings.find(item => item._id === id);
      
      if (existingListing) {
        setListing(existingListing);
        return;
      }
      
      // If not in store, fetch it from the API
      try {
        const response = await axios.get(`/api/food/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setListing(response.data);
      } catch (error) {
        setError('Failed to load food listing details');
        console.error('Error fetching food listing:', error);
      }
    };
    
    fetchListing();
  }, [id, foodListings]);
  
  const handleClaimDialogOpen = () => {
    setClaimDialog(true);
  };
  
  const handleClaimDialogClose = () => {
    setClaimDialog(false);
  };
  
  const handleDeliveryDetailsChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails({
      ...deliveryDetails,
      [name]: value
    });
  };
  
  const handleClaimListing = async () => {
    if (!deliveryDetails.deliveryAddress.trim()) {
      setError('Delivery address is required');
      return;
    }
    
    try {
      dispatch(updateFoodListingStart());
      
      const response = await axios.post(
        `/api/food/${id}/claim`,
        deliveryDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      
      dispatch(updateFoodListingSuccess(response.data));
      setListing(response.data);
      setClaimDialog(false);
    } catch (error) {
      dispatch(updateFoodListingFailure(error.message));
      setError(error.response?.data?.message || 'Failed to claim listing');
    }
  };
  
  const handleDeleteListing = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await axios.delete(`/api/food/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        navigate('/food-listings');
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to delete listing');
      }
    }
  };
  
  if (loading || !listing) {
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
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'claimed':
        return 'primary';
      case 'in_transit':
        return 'info';
      case 'delivered':
        return 'secondary';
      default:
        return 'default';
    }
  };
  
  const isOwner = user?.id === listing.business;
  const isCharity = user?.role === 'charity';
  const canClaim = isCharity && listing.status === 'available';
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Paper sx={{ p: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {listing.title}
              </Typography>
              <Chip
                label={listing.status.replace('_', ' ').toUpperCase()}
                color={getStatusColor(listing.status)}
              />
            </Box>
            
            <Typography variant="body1" paragraph>
              {listing.description}
            </Typography>
            
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <Chip
                icon={<CategoryIcon />}
                label={listing.category}
                variant="outlined"
              />
              <Chip
                label={`${listing.quantity} ${listing.unit}`}
                variant="outlined"
                color="primary"
              />
            </Stack>
            
            <Divider sx={{ my: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimeIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    <strong>Expiry Date:</strong> {format(new Date(listing.expiryDate), 'PPP')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TimeIcon color="action" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    <strong>Pickup Time:</strong> {format(new Date(listing.pickupTime), 'PPp')}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <LocationIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                  <Typography variant="body2">
                    <strong>Pickup Address:</strong><br />
                    {listing.pickupAddress}
                  </Typography>
                </Box>
              </Grid>
              {listing.safetyInfo && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <InfoIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                    <Typography variant="body2">
                      <strong>Safety Information:</strong><br />
                      {listing.safetyInfo}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {listing.notes && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <InfoIcon color="action" sx={{ mr: 1, mt: 0.5 }} />
                    <Typography variant="body2">
                      <strong>Additional Notes:</strong><br />
                      {listing.notes}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" gutterBottom>
                Actions
              </Typography>
              
              <Stack spacing={2}>
                {isOwner && (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<EditIcon />}
                      fullWidth
                      onClick={() => navigate(`/food-listings/edit/${id}`)}
                    >
                      Edit Listing
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<DeleteIcon />}
                      fullWidth
                      onClick={handleDeleteListing}
                    >
                      Delete Listing
                    </Button>
                  </>
                )}
                
                {canClaim && (
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleClaimDialogOpen}
                  >
                    Claim This Food
                  </Button>
                )}
                
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate('/food-listings')}
                >
                  Back to Listings
                </Button>
              </Stack>
              
              {listing.status !== 'available' && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Claim Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Claimed By:</strong> {listing.charity?.name || 'Unknown'}
                  </Typography>
                  {listing.deliveryAddress && (
                    <Typography variant="body2">
                      <strong>Delivery Address:</strong> {listing.deliveryAddress}
                    </Typography>
                  )}
                  {listing.volunteer && (
                    <Typography variant="body2">
                      <strong>Volunteer:</strong> {listing.volunteer?.name || 'Unknown'}
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Claim Dialog */}
      <Dialog open={claimDialog} onClose={handleClaimDialogClose} maxWidth="sm" fullWidth>
        <DialogTitle>Claim Food Listing</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph sx={{ mt: 1 }}>
            You are about to claim <strong>{listing.title}</strong>. Please provide your delivery details.
          </Typography>
          
          <TextField
            label="Delivery Address"
            name="deliveryAddress"
            value={deliveryDetails.deliveryAddress}
            onChange={handleDeliveryDetailsChange}
            fullWidth
            required
            margin="normal"
            error={error.includes('address')}
            helperText={error.includes('address') ? error : ''}
          />
          
          <TextField
            label="Additional Notes (Optional)"
            name="notes"
            value={deliveryDetails.notes}
            onChange={handleDeliveryDetailsChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClaimDialogClose}>Cancel</Button>
          <Button onClick={handleClaimListing} variant="contained" color="primary">
            Confirm Claim
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default FoodListingDetails;