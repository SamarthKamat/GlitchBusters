import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Button,
  CardActions
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const FoodListingCard = ({ listing, onClick }) => (
  <Card sx={{ height: '100%' }}>
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {listing.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {listing.description}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={`${listing.quantity} ${listing.unit}`} size="small" color="primary" />
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
        Donor: {listing.donor?.organization?.name || 'Unknown'}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onClick}>
        View Details
      </Button>
    </CardActions>
  </Card>
);

const CharityRequestCard = ({ request, onClick }) => (
  <Card>
    <CardContent>
      <Typography variant="h6" component="h2" gutterBottom>
        {request.title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {request.description}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
        <Chip label={request.category} size="small" color="primary" variant="outlined" />
        <Chip label={request.status} size="small" color="default" />
      </Stack>
      <Typography variant="body2">
        Quantity: {request.quantityFulfilled} / {request.quantityRequested} {request.unit}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small" onClick={onClick}>
        View Details
      </Button>
    </CardActions>
  </Card>
);

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ foodListings: [], charityRequests: [], organizations: [] });
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recommendations on page load
    axios.get('http://localhost:5000/api/recommendations', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      withCredentials: true
    })
      .then(response => setRecommendations(response.data))
      .catch(error => console.error('Error fetching recommendations:', error));
  }, []);

  const handleSearch = () => {
    axios.get('http://localhost:5000/api/search', {
      params: { query: searchQuery },
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      withCredentials: true
    })
      .then(response => setSearchResults(response.data))
      .catch(error => console.error('Error fetching search results:', error));
  };

  const handleCardClick = (type, id) => {
    if (type === 'food') navigate(`/food/${id}`);
    else if (type === 'charity') navigate(`/food-request/${id}`);
    else if (type === 'user') navigate(`/organization/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Explore Food Donations
      </Typography>
      
      {/* Search Section */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search for food donations, categories, or locations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>

      {/* Search Results */}
      {searchResults.foodListings.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Food Donations
          </Typography>
          <Grid container spacing={3}>
            {searchResults.foodListings.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <FoodListingCard
                  listing={item}
                  onClick={() => handleCardClick('food', item._id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {searchResults.charityRequests.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Charity Requests
          </Typography>
          <Grid container spacing={3}>
            {searchResults.charityRequests.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <CharityRequestCard
                  request={item}
                  onClick={() => handleCardClick('charity', item._id)}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {searchResults.organizations.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Organizations
          </Typography>
          <Grid container spacing={3}>
            {searchResults.organizations.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.organization?.description || 'No description available'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleCardClick('user', user._id)}>
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Recommendations */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Recommended For You
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <FoodListingCard
              listing={item}
              onClick={() => handleCardClick(item.type === 'charity' ? 'charity' : 'food', item._id)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Explore;