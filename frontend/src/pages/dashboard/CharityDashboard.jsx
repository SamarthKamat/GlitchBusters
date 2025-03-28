import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Favorite as FavoriteIcon,
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '@mui/x-date-pickers/AdapterDateFns';
import {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure,
  updateFoodListingStart,
  updateFoodListingSuccess,
  updateFoodListingFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

const CharityDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  const [stats, setStats] = useState({
    totalClaimed: 0,
    pendingPickup: 0,
    delivered: 0,
    totalQuantity: 0
  });
  const [selectedListing, setSelectedListing] = useState(null);
  const [pickupDialog, setPickupDialog] = useState(false);
  const [pickupDetails, setPickupDetails] = useState({
    pickupTime: '',
    notes: ''
  });

  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        dispatch(getFoodListingsStart());
        const response = await axios.get('http://localhost:5000/api/food', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch(getFoodListingsSuccess(response.data));

        // Calculate stats
        const claimedListings = response.data.filter(
          (listing) => listing.claimedBy === user.id
        );
        setStats({
          totalClaimed: claimedListings.length,
          pendingPickup: claimedListings.filter(
            (listing) => listing.status === 'claimed'
          ).length,
          delivered: claimedListings.filter(
            (listing) => listing.status === 'delivered'
          ).length,
          totalQuantity: claimedListings.reduce(
            (acc, listing) => acc + listing.quantity,
            0
          )
        });
      } catch (error) {
        dispatch(getFoodListingsFailure(error.message));
      }
    };

    fetchFoodListings();
  }, [dispatch, user.id]);

  const handleClaimFood = async (listing) => {
    try {
      dispatch(updateFoodListingStart());
      const response = await axios.post(
        `/api/food/${listing._id}/claim`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      dispatch(updateFoodListingSuccess(response.data));
    } catch (error) {
      dispatch(updateFoodListingFailure(error.message));
    }
  };

  const handlePickupDetails = async () => {
    try {
      dispatch(updateFoodListingStart());
      const response = await axios.patch(
        `/api/food/${selectedListing._id}/pickup`,
        pickupDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      dispatch(updateFoodListingSuccess(response.data));
      setPickupDialog(false);
      setSelectedListing(null);
    } catch (error) {
      dispatch(updateFoodListingFailure(error.message));
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  const FoodListingCard = ({ listing }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {listing.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip
            label={`${listing.quantity} ${listing.unit}`}
            size="small"
            color="primary"
          />
          <Chip label={listing.category} size="small" />
          <Chip
            label={listing.status.toUpperCase()}
            size="small"
            color={
              listing.status === 'available'
                ? 'success'
                : listing.status === 'claimed'
                ? 'warning'
                : 'info'
            }
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Expires: {format(new Date(listing.expiryDate), 'PPP')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Donor: {listing.donor?.organization?.name}
        </Typography>
      </CardContent>
      <CardActions>
        {listing.status === 'available' ? (
          <Button
            size="small"
            color="primary"
            onClick={() => handleClaimFood(listing)}
          >
            Claim Food
          </Button>
        ) : listing.status === 'claimed' && listing.claimedBy === user.id ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setSelectedListing(listing);
              setPickupDialog(true);
            }}
          >
            Schedule Pickup
          </Button>
        ) : (
          <Button
            size="small"
            onClick={() => navigate(`/food-listings/${listing._id}`)}
          >
            View Details
          </Button>
        )}
      </CardActions>
    </Card>
  );

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
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Charity Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Claimed"
            value={stats.totalClaimed}
            icon={<FavoriteIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Pickup"
            value={stats.pendingPickup}
            icon={<ShippingIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Delivered"
            value={stats.delivered}
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Quantity (kg)"
            value={stats.totalQuantity}
            icon={<TrendingUpIcon />}
            color="info"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>
        History of Food Requests
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter(
            (listing) =>
              listing.claimedBy === user.id &&
              (listing.status === 'delivered' || listing.status === 'cancelled')
          )
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <FoodListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
        Your Claimed Donations
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter(
            (listing) =>
              listing.claimedBy === user.id && listing.status !== 'available'
          )
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <FoodListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Current Food Requests
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter(
            (listing) =>
              listing.claimedBy === user.id &&
              (listing.status === 'claimed' || listing.status === 'in-progress')
          )
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <FoodListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>

      <Dialog open={pickupDialog} onClose={() => setPickupDialog(false)}>
        <DialogTitle>Schedule Pickup</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Pickup Time"
            type="datetime-local"
            value={pickupDetails.pickupTime}
            onChange={(e) =>
              setPickupDetails({ ...pickupDetails, pickupTime: e.target.value })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Additional Notes"
            multiline
            rows={4}
            value={pickupDetails.notes}
            onChange={(e) =>
              setPickupDetails({ ...pickupDetails, notes: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPickupDialog(false)}>Cancel</Button>
          <Button onClick={handlePickupDetails} color="primary">
            Schedule
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CharityDashboard;