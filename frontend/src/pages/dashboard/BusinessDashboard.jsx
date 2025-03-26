import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  CircularProgress
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '@mui/x-date-pickers/AdapterDateFns';
import {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  const [stats, setStats] = useState({
    totalDonations: 0,
    activeDonations: 0,
    claimedDonations: 0,
    deliveredDonations: 0
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
        const myListings = response.data.filter(
          (listing) => listing.donor === user.id
        );
        setStats({
          totalDonations: myListings.length,
          activeDonations: myListings.filter(
            (listing) => listing.status === 'available'
          ).length,
          claimedDonations: myListings.filter(
            (listing) => listing.status === 'claimed'
          ).length,
          deliveredDonations: myListings.filter(
            (listing) => listing.status === 'delivered'
          ).length
        });
      } catch (error) {
        dispatch(getFoodListingsFailure(error.message));
      }
    };

    fetchFoodListings();
  }, [dispatch, user.id]);

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
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => navigate(`/food-listings/${listing._id}`)}
        >
          View Details
        </Button>
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Typography variant="h4">Business Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/food-listings/create')}
        >
          New Food Listing
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Donations"
            value={stats.totalDonations}
            icon={<RestaurantIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Listings"
            value={stats.activeDonations}
            icon={<TrendingUpIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Claimed"
            value={stats.claimedDonations}
            icon={<FavoriteIcon />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Delivered"
            value={stats.deliveredDonations}
            icon={<RestaurantIcon />}
            color="info"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ mb: 3 }}>
        Your Food Listings
      </Typography>

      <Grid container spacing={3}>
        {foodListings
          .filter((listing) => listing.donor === user.id)
          .map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <FoodListingCard listing={listing} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default BusinessDashboard;