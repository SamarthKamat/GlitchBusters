import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@mui/material';
import { format } from 'date-fns';
import axios from 'axios';

const FoodRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequestDetails();
  }, [id]);

  const fetchRequestDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/charity_request/request/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setRequest(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch request details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  const progress = (request?.quantityFulfilled / request?.quantityRequested) * 100;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Button onClick={() => navigate('/food-requests')} sx={{ mb: 2 }}>
            Back to Requests
          </Button>
          <Typography variant="h4" gutterBottom>
            {request?.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip label={request?.category} color="primary" />
            <Chip label={request?.status} color="secondary" />
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography paragraph>
              {request?.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Progress
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={progress} 
                    sx={{ height: 10, borderRadius: 5 }}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {Math.round(progress)}%
                </Typography>
              </Box>
              <Typography>
                {request?.quantityFulfilled} / {request?.quantityRequested} {request?.unit}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }} variant="outlined">
              <Typography variant="h6" gutterBottom>
                Request Details
              </Typography>
              <List>
                <ListItem>
                  <ListItemText 
                    primary="Status"
                    secondary={request?.status}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Created By"
                    secondary={request?.charity?.organization?.name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Created At"
                    secondary={format(new Date(request?.createdAt), 'PPP')}
                  />
                </ListItem>
              </List>
            </Paper>

            {request?.donations?.length > 0 && (
              <Paper sx={{ p: 2, mt: 2 }} variant="outlined">
                <Typography variant="h6" gutterBottom>
                  Donations
                </Typography>
                <List>
                  {request.donations.map((donation, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={`${donation.quantity} ${request.unit}`}
                        secondary={donation.donor?.organization?.name}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default FoodRequestDetails;