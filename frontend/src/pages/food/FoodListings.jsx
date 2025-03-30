import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Chip,
  Stack,
  CircularProgress,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { format, isValid, parseISO } from 'date-fns';
import {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';
import config from '../../config';

// Add this function before the FoodListings component
const getStatusColor = (status) => {
  switch (status) {
    case 'available':
      return 'success';
    case 'claimed':
      return 'primary';
    case 'in_transit':
      return 'warning';
    case 'delivered':
      return 'info';
    default:
      return 'default';
  }
};

// Also add the formatDate and formatDateTime functions that are used
const formatDate = (date) => {
  if (!date) return 'N/A';
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy') : 'Invalid Date';
};

const formatDateTime = (date) => {
  if (!date) return 'N/A';
  const parsedDate = parseISO(date);
  return isValid(parsedDate) ? format(parsedDate, 'MMM dd, yyyy hh:mm a') : 'Invalid Date';
};

const FoodListings = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });

  useEffect(() => {
    const fetchFoodListings = async () => {
      try {
        dispatch(getFoodListingsStart());
        const response = await axios.get(`${config.apiBaseUrl}/food`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch(getFoodListingsSuccess(response.data));
      } catch (error) {
        dispatch(getFoodListingsFailure(error.message));
      }
    };

    fetchFoodListings();
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Filter listings based on user role and status
  const filteredListings = foodListings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category ? listing.category === filters.category : true;
    const matchesStatus = filters.status ? listing.status === filters.status : true;
    
    // For business users, only show their unclaimed listings
    if (user?.role === 'business') {
      return matchesSearch && 
             matchesCategory && 
             matchesStatus && 
             listing.businessId === user._id && 
             listing.status === 'available';
    }
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, width: '100%' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Food Listings
        </Typography>
        {user?.role === 'business' && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/food-listings/create')}
          >
            Create New Listing
          </Button>
        )}
      </Stack>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search listings..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="produce">Produce</MenuItem>
                <MenuItem value="bakery">Bakery</MenuItem>
                <MenuItem value="dairy">Dairy</MenuItem>
                <MenuItem value="meat">Meat</MenuItem>
                <MenuItem value="prepared">Prepared Food</MenuItem>
                <MenuItem value="canned">Canned Goods</MenuItem>
                <MenuItem value="dry">Dry Goods</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                <MenuItem value="available">Available</MenuItem>
                <MenuItem value="claimed">Claimed</MenuItem>
                <MenuItem value="in_transit">In Transit</MenuItem>
                <MenuItem value="delivered">Delivered</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Listings Grid */}
      <Grid container spacing={3}>
        {filteredListings.length > 0 ? (
          filteredListings.map((listing) => (
            <Grid item xs={12} sm={6} md={4} key={listing._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {listing.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {listing.description.length > 100
                      ? `${listing.description.substring(0, 100)}...`
                      : listing.description}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip
                      label={`${listing.quantity} ${listing.unit}`}
                      size="small"
                      color="primary"
                    />
                    <Chip label={listing.category} size="small" />
                    <Chip
                      label={listing.status.replace('_', ' ').toUpperCase()}
                      size="small"
                      color={getStatusColor(listing.status)}
                    />
                  </Stack>
                  <Typography variant="body2" color="text.secondary">
                    Expires: {formatDate(listing.expiryDate)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Pickup: {formatDateTime(listing.pickupTime)}
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
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" textAlign="center">
            No food listings found
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default FoodListings;
