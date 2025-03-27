import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { format, parseISO } from 'date-fns';
import axios from 'axios';

const getStatusColor = (status) => {
  switch (status) {
    case 'pending':
      return 'warning';
    case 'partially_fulfilled':
      return 'info';
    case 'fulfilled':
      return 'success';
    default:
      return 'default';
  }
};

const FoodRequests = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    status: ''
  });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/charity_request/requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRequests(response.data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category ? request.category === filters.category : true;
    const matchesStatus = filters.status ? request.status === filters.status : true;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1">
          Food Requests
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/food-requests/create')}
        >
          Create New Request
        </Button>
      </Stack>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search requests..."
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
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="produce">Produce</MenuItem>
                <MenuItem value="dairy">Dairy</MenuItem>
                <MenuItem value="bakery">Bakery</MenuItem>
                <MenuItem value="meat">Meat</MenuItem>
                <MenuItem value="prepared">Prepared</MenuItem>
                <MenuItem value="pantry">Pantry</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                label="Status"
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="partially_fulfilled">Partially Fulfilled</MenuItem>
                <MenuItem value="fulfilled">Fulfilled</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Requests Grid */}
      <Grid container spacing={3}>
        {filteredRequests.map((request) => (
          <Grid item xs={12} md={6} lg={4} key={request._id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {request.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {request.description}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Chip
                    label={request.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={request.status}
                    size="small"
                    color={getStatusColor(request.status)}
                  />
                </Stack>
                <Typography variant="body2">
                  Quantity: {request.quantityFulfilled} / {request.quantityRequested} {request.unit}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/food-requests/${request._id}`)}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default FoodRequests;