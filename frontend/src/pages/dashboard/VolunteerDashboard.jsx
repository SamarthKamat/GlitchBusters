import React, { useState, useEffect } from 'react';
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
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  IconButton,
  Container,
} from '@mui/material';

import {
  CheckCircle as CheckCircleIcon,
  Assignment as AssignmentIcon,
  LocalShipping as ShippingIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  EmojiEvents as AchievementsIcon,
  Settings as SettingsIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';

// -------------------------
// Styled Components
// -------------------------
const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
  padding: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 48px rgba(46, 125, 50, 0.12)',
  }
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const ImpactMetric = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  textAlign: 'center',
  background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.08) 0%, rgba(76, 175, 80, 0.08) 100%)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(46, 125, 50, 0.12)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '&.Mui-selected': {
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
    '&:hover': {
      backgroundColor: 'rgba(46, 125, 50, 0.12)',
    }
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.98)',
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 32px rgba(46, 125, 50, 0.12)',
  }
}));

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 100%)',
  color: 'white',
  boxShadow: '0 4px 20px rgba(46, 125, 50, 0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '100%',
}));

const StatusBadge = styled(Chip)(({ theme, status }) => ({
  fontWeight: 'bold',
  ...(status === 'Available' && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.contrastText,
  }),
  ...(status === 'In Progress' && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.contrastText,
  }),
}));

// -------------------------
// Main Component
// -------------------------
const VolunteerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  
  // Mock data for deliveries
  const [listings] = useState([
    {
      id: '1',
      title: 'Fresh Vegetables',
      status: 'Available',
      quantity: 5,
      description: 'Fresh vegetables from local farm',
      location: 'Andheri East, Mumbai',
      time: '2:30 PM - 4:00 PM',
      distance: '3.2 km',
      image: 'https://source.unsplash.com/random/300x200/?vegetables'
    },
    {
      id: '2',
      title: 'Canned Goods',
      status: 'Available',
      quantity: 12,
      description: 'Assorted canned goods for distribution',
      location: 'Bandra West, Mumbai',
      time: '1:00 PM - 3:00 PM',
      distance: '5.7 km',
      image: 'https://source.unsplash.com/random/300x200/?canned-food'
    },
    {
      id: '3',
      title: 'Bread and Pastries',
      status: 'In Progress',
      quantity: 8,
      description: 'Fresh bread and pastries from local bakery',
      location: 'Dadar, Mumbai',
      time: '10:00 AM - 12:00 PM',
      distance: '2.1 km',
      image: 'https://source.unsplash.com/random/300x200/?bread'
    }
  ]);

  const handleAcceptDelivery = (listing) => {
    console.log("Accepted delivery:", listing);
  };

  return (
    <DashboardContainer>
      <Container maxWidth="lg">
        <ProfileCard>
          <Avatar 
            sx={{ 
              width: 80, 
              height: 80,
              border: '3px solid #2E7D32',
            }} 
            src="https://source.unsplash.com/random/100x100/?portrait"
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h5" fontWeight="bold">Volunteer Name</Typography>
            <Typography variant="body2" color="text.secondary">
              Mumbai, India
            </Typography>
            <Chip 
              icon={<CheckCircleIcon />}
              label="Verified Volunteer" 
              size="small" 
              color="success"
              sx={{ mt: 1 }}
            />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold" color="primary">
              {format(currentDate, 'EEEE, MMMM d')}
            </Typography>
          </Box>
        </ProfileCard>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <StyledPaper>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Navigation
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<DashboardIcon />}
                    sx={{ 
                      p: 1.5, 
                      borderRadius: 2,
                      justifyContent: 'flex-start',
                      backgroundColor: 'rgba(46, 125, 50, 0.08)',
                    }}
                  >
                    Dashboard
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<AssignmentIcon />}
                    sx={{ p: 1.5, borderRadius: 2, justifyContent: 'flex-start' }}
                  >
                    Active
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<HistoryIcon />}
                    sx={{ p: 1.5, borderRadius: 2, justifyContent: 'flex-start' }}
                  >
                    History
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth
                    startIcon={<SettingsIcon />}
                    sx={{ p: 1.5, borderRadius: 2, justifyContent: 'flex-start' }}
                  >
                    Settings
                  </Button>
                </Grid>
              </Grid>
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4}>
            <ImpactMetric>
              <TrendingUpIcon color="success" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">32</Typography>
              <Typography variant="body1" fontWeight="medium">Meals Delivered</Typography>
              <Typography variant="caption" color="text.secondary">
                You're making a difference!
              </Typography>
            </ImpactMetric>
          </Grid>
        </Grid>

        <StyledPaper>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Delivery Status
          </Typography>
          <Box sx={{ p: 2, mb: 3, bgcolor: 'rgba(46, 125, 50, 0.08)', borderRadius: 2, border: '1px dashed rgba(46, 125, 50, 0.3)' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <TimeIcon />
              </Avatar>
              <Box>
                <Typography variant="body1" fontWeight="medium">
                  You currently have 3 active deliveries scheduled for today.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Next pickup: Dadar, Mumbai at 10:00 AM
                </Typography>
              </Box>
            </Stack>
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StatsCard>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Today's Deliveries</Typography>
                  <Typography variant="h4" fontWeight="bold">3</Typography>
                </Box>
                <ShippingIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StatsCard>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Distance</Typography>
                  <Typography variant="h4" fontWeight="bold">12 km</Typography>
                </Box>
                <LocationIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </StatsCard>
            </Grid>
            <Grid item xs={12} md={4}>
              <StatsCard>
                <Box>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>Completion Rate</Typography>
                  <Typography variant="h4" fontWeight="bold">98%</Typography>
                </Box>
                <CheckCircleIcon sx={{ fontSize: 40, opacity: 0.8 }} />
              </StatsCard>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledPaper>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Available Deliveries
          </Typography>
          <Grid container spacing={3}>
            {listings.map((listing) => (
              <Grid item xs={12} md={4} key={listing.id}>
                <StyledCard>
                  <Box sx={{ 
                    height: 140, 
                    backgroundImage: `url(${listing.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    <Box sx={{ 
                      position: 'absolute', 
                      top: 10, 
                      right: 10,
                    }}>
                      <StatusBadge 
                        label={listing.status} 
                        status={listing.status}
                        size="small"
                      />
                    </Box>
                  </Box>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight="bold">{listing.title}</Typography>
                    <Stack direction="row" spacing={1} sx={{ my: 1 }}>
                      <Chip 
                        icon={<LocationIcon fontSize="small" />} 
                        label={listing.distance} 
                        size="small" 
                        variant="outlined"
                      />
                      <Chip 
                        icon={<TimeIcon fontSize="small" />} 
                        label={listing.time} 
                        size="small" 
                        variant="outlined"
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {listing.description}
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      <LocationIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                      {listing.location}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleAcceptDelivery(listing)}
                      startIcon={<ShippingIcon />}
                      sx={{ borderRadius: 8 }}
                    >
                      Accept Delivery
                    </Button>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>
    </DashboardContainer>
  );
};

export default VolunteerDashboard;