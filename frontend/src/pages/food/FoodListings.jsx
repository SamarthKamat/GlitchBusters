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
  Add as AddIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import '@mui/x-date-pickers/AdapterDateFns';
import {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

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
        const response = await axios.get('/api/food', {
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

  const filteredListings = foodListings.filter((listing) => {
    // Search term filter
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = filters.category ? listing.category === filters.category : true;
    
    // Status filter
    const matchesStatus = filters.status ? listing.status === filters.status : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    { value: 'produce', label: 'Produce' },
    { value: 'bakery', label: 'Bakery' },
    { value: 'dairy', label: 'Dairy' },
    { value: 'meat', label: 'Meat' },
    { value: 'prepared', label: 'Prepared Food' },
    { value: 'canned', label: 'Canned Goods' },
    { value: 'dry', label: 'Dry Goods' }
  ];

  const statuses = [
    { value: 'available', label: 'Available' },
    { value: 'claimed', label: 'Claimed' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'delivered', label: 'Delivered' }
  ];

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
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center" justifyContent="space-between">
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              Food Listings
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            {user?.role === 'business' && (
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/food-listings/create')}
              >
                Create Listing
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>

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
                label="Category"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value}>
                    {category.label}
                  </MenuItem>
                ))}
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
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
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
                  <Typography variant="body2">
                    Expires: {format(new Date(listing.expiryDate), 'PPP')}
                  </Typography>
                  <Typography variant="body2">
                    Pickup: {format(new Date(listing.pickupTime), 'PPp')}
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
          <Grid item xs={12}>
            <Box
              sx={{
                textAlign: 'center',
                py: 5
              }}
            >
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No food listings found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm || filters.category || filters.status
                  ? 'Try adjusting your search or filters'
                  : 'Be the first to create a food listing'}
              </Typography>
              {user?.role === 'business' && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => navigate('/food-listings/create')}
                  sx={{ mt: 2 }}
                >
                  Create Listing
                </Button>
              )}
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FoodListings;