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
  CircularProgress,
  Container
} from '@mui/material';
import {
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon,
  History as HistoryIcon,
  CalendarToday as CalendarTodayIcon,
  LocalShipping as LocalShippingIcon,
  EmojiEvents as EmojiEventsIcon
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
import { motion } from 'framer-motion';
import { keyframes } from '@emotion/react';

const pulseKeyframe = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const BusinessDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  const [stats, setStats] = useState({
    totalDonations: 5,
    activeDonations: 10,
    claimedDonations: 2,
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

  const FoodListingCard = ({ listing }) => (
    <Card 
      component={motion.div}
      {...fadeInUp}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 25px 0 rgba(0,0,0,0.1)'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2E7D32' }}>
          {listing.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {listing.description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`${listing.quantity} ${listing.unit}`}
            size="small"
            sx={{ bgcolor: '#E8F5E9', color: '#2E7D32' }}
          />
          <Chip 
            label={listing.category} 
            size="small"
            sx={{ bgcolor: '#F5F5F5' }}
          />
          <Chip
            label={listing.status.toUpperCase()}
            size="small"
            sx={{
              bgcolor: listing.status === 'available' 
                ? '#E8F5E9' 
                : listing.status === 'claimed'
                ? '#FFF3E0'
                : '#E3F2FD',
              color: listing.status === 'available'
                ? '#2E7D32'
                : listing.status === 'claimed'
                ? '#EF6C00'
                : '#1976D2'
            }}
          />
        </Stack>
        <Typography variant="body2" sx={{ color: '#666', display: 'flex', alignItems: 'center', gap: 1 }}>
          <span style={{ fontWeight: 600 }}>Expires:</span> 
          {format(new Date(listing.expiryDate), 'PPP')}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => navigate(`/food-listings/${listing._id}`)}
          sx={{
            borderColor: '#2E7D32',
            color: '#2E7D32',
            '&:hover': {
              borderColor: '#1B5E20',
              bgcolor: 'rgba(46, 125, 50, 0.08)'
            }
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );

  // Remove the standalone return statement at the bottom
  // Keep only the main return statement inside the component
  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #FFFFFF, #F3F8F4)',
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
        pt: 6,
        pb: 12,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(to top right, #FFFFFF 49%, transparent 51%)',
        }
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" sx={{ 
                color: 'white',
                fontWeight: 800,
                mb: 2,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Welcome, {user.name}
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'rgba(255,255,255,0.9)',
                mb: 4,
                maxWidth: 500
              }}>
                Your contribution is making a difference. Let's reduce food waste together.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-end' }
              }}>
                <Card sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  p: 2,
                  borderRadius: 3,
                  minWidth: 200
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {stats.totalDonations}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    Total Donations
                  </Typography>
                </Card>
                <Card sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  p: 2,
                  borderRadius: 3,
                  minWidth: 200
                }}>
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 700 }}>
                    {stats.deliveredDonations}
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.9)' }}>
                    Lives Impacted
                  </Typography>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ mt: -8, pb: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* Quick Stats */}
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {[
                {
                  title: "Active Listings",
                  value: stats.activeDonations,
                  icon: <RestaurantIcon />,
                  color: "#4CAF50"
                },
                {
                  title: "In Progress",
                  value: stats.claimedDonations,
                  icon: <LocalShippingIcon />,
                  color: "#FF9800"
                },
                {
                  title: "This Month",
                  value: stats.totalDonations,
                  icon: <CalendarTodayIcon />,  // Changed from CalendarMonthIcon
                  color: "#2196F3"
                },
                {
                  title: "Impact Score",
                  value: "A+",
                  icon: <EmojiEventsIcon />,
                  color: "#9C27B0"
                }
              ].map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card sx={{ 
                    p: 3,
                    borderRadius: 4,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Typography color="text.secondary">
                        {stat.title}
                      </Typography>
                      <Box sx={{ 
                        color: 'white',
                        bgcolor: stat.color,
                        p: 1,
                        borderRadius: 2,
                        display: 'flex'
                      }}>
                        {stat.icon}
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.value}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Active Listings Section */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              overflow: 'hidden'
            }}>
              <Box sx={{ 
                p: 3,
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Active Food Listings
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    bgcolor: '#4CAF50',
                    '&:hover': { bgcolor: '#388E3C' }
                  }}
                  onClick={() => navigate('/create-listing')}
                >
                  New Listing
                </Button>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {foodListings
                    .filter(listing => listing.status === 'available')
                    .map((listing) => (
                      <Grid item xs={12} sm={6} md={4} key={listing._id}>
                        <FoodListingCard listing={listing} />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Card>
          </Grid>

          {/* History Section */}
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <Box sx={{ p: 3, borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  Donation History
                </Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {foodListings
                    .filter(listing => listing.status === 'delivered')
                    .slice(0, 6)
                    .map((listing) => (
                      <Grid item xs={12} sm={6} md={4} key={listing._id}>
                        <HistoryCard listing={listing} />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default BusinessDashboard;