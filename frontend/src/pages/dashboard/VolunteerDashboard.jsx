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
  LocalShipping as ShippingIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon
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

const VolunteerDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  const [stats, setStats] = useState({
    totalDeliveries: 0,
    pendingDeliveries: 0,
    completedDeliveries: 0,
    inProgressDeliveries: 0
  });
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [deliveryDialog, setDeliveryDialog] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    estimatedTime: '',
    notes: ''
  });

  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        dispatch(getFoodListingsStart());
        const response = await axios.get('/api/food', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch(getFoodListingsSuccess(response.data));

        // Calculate stats
        const myDeliveries = response.data.filter(
          (listing) => listing.volunteer === user.id
        );
        setStats({
          totalDeliveries: myDeliveries.length,
          pendingDeliveries: myDeliveries.filter(
            (listing) => listing.status === 'claimed'
          ).length,
          inProgressDeliveries: myDeliveries.filter(
            (listing) => listing.status === 'in_transit'
          ).length,
          completedDeliveries: myDeliveries.filter(
            (listing) => listing.status === 'delivered'
          ).length
        });
      } catch (error) {
        dispatch(getFoodListingsFailure(error.message));
      }
    };

    fetchFoodListings();
  }, [dispatch, user.id]);

  const handleAcceptDelivery = async (listing) => {
    try {
      dispatch(updateFoodListingStart());
      const response = await axios.post(
        `/api/food/${listing._id}/accept-delivery`,
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

  const handleUpdateDelivery = async () => {
    try {
      dispatch(updateFoodListingStart());
      const response = await axios.patch(
        `/api/food/${selectedDelivery._id}/update-delivery`,
        deliveryDetails,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }
      );
      dispatch(updateFoodListingSuccess(response.data));
      setDeliveryDialog(false);
      setSelectedDelivery(null);
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

  const DeliveryCard = ({ listing }) => (
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
              listing.status === 'claimed'
                ? 'warning'
                : listing.status === 'in_transit'
                ? 'info'
                : 'success'
            }
          />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          Pickup: {listing.pickupAddress}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Delivery: {listing.deliveryAddress}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Scheduled: {format(new Date(listing.pickupTime), 'PPP')}
        </Typography>
      </CardContent>
      <CardActions>
        {listing.status === 'claimed' ? (
          <Button
            size="small"
            color="primary"
            onClick={() => handleAcceptDelivery(listing)}
          >
            Accept Delivery
          </Button>
        ) : listing.status === 'in_transit' ? (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              setSelectedDelivery(listing);
              setDeliveryDialog(true);
            }}
          >
            Update Status
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
        Volunteer Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Deliveries"
            value={stats.totalDeliveries}
            icon={<ShippingIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pendingDeliveries}
            icon={<ScheduleIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="In Progress"
            value={stats.inProgressDeliveries}
            icon={<TrendingUpIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed"
            value={stats.completedDeliveries}
            icon={<CheckCircleIcon />}
            color="success"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Available Deliveries
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter((listing) => listing.status === 'claimed' && !listing.volunteer)
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <DeliveryCard listing={listing} />
            </Grid>
          ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 6, mb: 3 }}>
        Your Deliveries
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter((listing) => listing.volunteer === user.id)
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <DeliveryCard listing={listing} />
            </Grid>
          ))}
      </Grid>

      <Dialog open={deliveryDialog} onClose={() => setDeliveryDialog(false)}>
        <DialogTitle>Update Delivery Status</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Estimated Delivery Time"
            type="datetime-local"
            value={deliveryDetails.estimatedTime}
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                estimatedTime: e.target.value
              })
            }
            InputLabelProps={{ shrink: true }}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Delivery Notes"
            multiline
            rows={4}
            value={deliveryDetails.notes}
            onChange={(e) =>
              setDeliveryDetails({ ...deliveryDetails, notes: e.target.value })
            }
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeliveryDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateDelivery} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VolunteerDashboard;