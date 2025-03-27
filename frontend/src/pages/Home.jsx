import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Divider,
  Paper,
  useTheme
} from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Restaurant as RestaurantIcon,
  Favorite as CharityIcon,
  DirectionsBike as VolunteerIcon,
  Assessment as ImpactIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  WhatsApp as WhatsAppIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();

  // Hero slider images
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Reducing Food Waste",
      subtitle: "Connecting businesses with surplus food to local charities"
    },
    {
      url: "https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Feeding Communities",
      subtitle: "Making a difference in the lives of those in need"
    },
    {
      url: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80",
      title: "Building Connections",
      subtitle: "Creating a network of businesses, charities, and volunteers"
    },
    {
      url: "https://images.unsplash.com/photo-1488330890490-36e0ea80d6eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      title: "Sustainable Solutions",
      subtitle: "Working together for a more sustainable food system"
    }
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    fade: true
  };

  const features = [
    {
      icon: <RestaurantIcon sx={{ fontSize: 40 }} />,
      title: 'Business Accounts',
      description: 'Allow restaurants, grocery stores, and event organizers to list available surplus food.'
    },
    {
      icon: <CharityIcon sx={{ fontSize: 40 }} />,
      title: 'Charity Accounts',
      description: 'Enable charities and food banks to view and claim available food donations.'
    },
    {
      icon: <VolunteerIcon sx={{ fontSize: 40 }} />,
      title: 'Volunteer Network',
      description: 'Allow individuals to sign up as volunteers to help with food pickups and deliveries.'
    },
    {
      icon: <ImpactIcon sx={{ fontSize: 40 }} />,
      title: 'Impact Dashboard',
      description: 'Provide reports on the amount of food saved and distributed to those in need.'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Safety Guidelines',
      description: 'Ensure food donations comply with health and safety regulations with integrated checklists.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Real-Time Matching',
      description: 'Smart system that notifies charities and food banks when new surplus food is listed.'
    }
  ];

  const stats = [
    {
      value: '5.9M+',
      label: 'Meals Saved',
      icon: '🍲'
    },
    {
      value: '4.7M+',
      label: 'Beneficiaries Served',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      value: '1062+',
      label: 'Partner Restaurants',
      icon: '🏢'
    },
    {
      value: '510+',
      label: 'Charity Partners',
      icon: '🏥'
    }
  ];

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Header with contact info */}
      <Box sx={{ bgcolor: '#4CAF50', color: 'white', py: 1 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmailIcon fontSize="small" />
                <Typography variant="body2">contact@glitchbusters.org</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon fontSize="small" />
                <Typography variant="body2">+1 800 123 4567</Typography>
              </Stack>
            </Stack>
            <Stack direction="row" spacing={2}>
              <FacebookIcon fontSize="small" />
              <LinkedInIcon fontSize="small" />
              <InstagramIcon fontSize="small" />
              <YouTubeIcon fontSize="small" />
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Navigation */}
      <Box sx={{ bgcolor: 'white', py: 2, boxShadow: 1 }}>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" component="div" sx={{ fontWeight: 700, color: '#2E7D32' }}>
              GlitchBusters
            </Typography>
            <Stack direction="row" spacing={4}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>Home</Typography>
              <Typography variant="body1">About</Typography>
              <Typography variant="body1">Our Initiatives</Typography>
              <Typography variant="body1">Donations</Typography>
              <Typography variant="body1">Contact Us</Typography>
              <Typography variant="body1">Blog</Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#2E7D32' },
                borderRadius: '20px',
                px: 3
              }}
            >
              Donate
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section with Slider */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '70vh', md: '90vh' },
          width: '100%',
          overflow: 'hidden'
        }}
      >
        <Slider {...sliderSettings}>
          {heroImages.map((image, index) => (
            <Box key={index}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '70vh', md: '90vh' },
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0,0,0,0.5)',
                    zIndex: 1
                  },
                  backgroundImage: `url("${image.url}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'all 0.5s ease-in-out'
                }}
              >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
                  <Grid container>
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="h1"
                        sx={{
                          fontSize: { xs: '2.5rem', md: '4rem' },
                          fontWeight: 700,
                          color: 'white',
                          mb: 3,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                      >
                        {index === 0 ? (
                          <>
                            Reducing Food Waste,<br />Feeding Communities
                          </>
                        ) : (
                          <>
                            {image.title}
                          </>
                        )}
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={{
                          color: 'white',
                          mb: 4,
                          maxWidth: '700px',
                          textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                        }}
                      >
                        {index === 0 ? 
                          "Witness the transformative power of food as we connect businesses with surplus food to local charities and make a difference." :
                          image.subtitle
                        }
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <Button
                          component={RouterLink}
                          to="/register"
                          variant="contained"
                          size="large"
                          sx={{
                            bgcolor: '#4CAF50',
                            '&:hover': { bgcolor: '#2E7D32' },
                            px: 4,
                            py: 1.5,
                            borderRadius: '30px',
                            fontSize: '1.1rem'
                          }}
                        >
                          Join Our Cause
                        </Button>
                        <Button
                          component={RouterLink}
                          to="/login"
                          variant="outlined"
                          size="large"
                          sx={{
                            borderColor: 'white',
                            color: 'white',
                            '&:hover': {
                              borderColor: '#4CAF50',
                              bgcolor: 'rgba(76, 175, 80, 0.1)'
                            },
                            px: 4,
                            py: 1.5,
                            borderRadius: '30px',
                            fontSize: '1.1rem'
                          }}
                        >
                          Learn More
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* Our Endeavour Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f9f9f9', width: '100%', mt: 0 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ fontWeight: 700, mb: 6, color: '#2E7D32' }}
          >
            Our Endeavour As NGO
          </Typography>
          
          <Typography variant="h6" align="center" sx={{ maxWidth: '900px', mx: 'auto', mb: 6 }}>
            At our core, we believe a <strong>food-secure society helps unlock its true potential</strong>. We are not only
            nourishing bodies but also <strong>opening doors to better education, health and prosperity</strong> for fellow
            citizens. Together, we can pave the way for a future where <strong>every vulnerable has an equal chance
            to thrive</strong>.
          </Typography>

          {/* Stats Section */}
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 6 }}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    textAlign: 'center',
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '16px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h3" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, color: '#2E7D32', mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              component={RouterLink}
              to="/register"
              variant="contained"
              size="large"
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#2E7D32' },
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                fontSize: '1.1rem'
              }}
            >
              Join Our Cause
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ fontWeight: 700, mb: 2, color: '#2E7D32' }}
        >
          How It Works
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          sx={{ mb: 8, maxWidth: '800px', mx: 'auto' }}
        >
          Our platform connects businesses with surplus food to local charities, reducing waste and feeding communities.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.08)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ 
                  height: '8px', 
                  bgcolor: '#4CAF50' 
                }} />
                <CardContent sx={{ flexGrow: 1, p: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      mb: 3,
                      width: '70px',
                      height: '70px',
                      borderRadius: '50%',
                      bgcolor: 'rgba(76, 175, 80, 0.1)',
                      color: '#2E7D32',
                      mx: 'auto'
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h3"
                    align="center"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary" align="center">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Impact Section */}
      <Box sx={{ bgcolor: '#2E7D32', color: 'white', py: { xs: 8, md: 12 } }}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Make an Impact Today
              </Typography>
              <Typography variant="h6" paragraph sx={{ opacity: 0.9, mb: 4 }}>
                Join our network and help reduce food waste while supporting those
                in need in your community. Every meal saved is a step towards a more
                sustainable and equitable future.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                  component={RouterLink}
                  to="/register"
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: '#2E7D32',
                    '&:hover': { bgcolor: '#f0f0f0' },
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    fontSize: '1.1rem'
                  }}
                >
                  Get Started
                </Button>
                <Button
                  component={RouterLink}
                  to="/login"
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255, 255, 255, 0.1)'
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: '30px',
                    fontSize: '1.1rem'
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }}
              >
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Impact"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1B5E20', color: 'white', py: 6 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
                GlitchBusters
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                Our mission is to reduce food waste by connecting businesses with surplus food to local charities, creating a more sustainable and equitable food system.
              </Typography>
              <Stack direction="row" spacing={2}>
                <FacebookIcon />
                <LinkedInIcon />
                <InstagramIcon />
                <YouTubeIcon />
                <WhatsAppIcon />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Quick Links
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2">About Us</Typography>
                <Typography variant="body2">Our Initiatives</Typography>
                <Typography variant="body2">Donate</Typography>
                <Typography variant="body2">Blog</Typography>
                <Typography variant="body2">Contact Us</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Contact Information
              </Typography>
              <Stack spacing={2}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <LocationIcon />
                  <Typography variant="body2">
                    123 Food Rescue Street, Sustainability City, 10001
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <EmailIcon />
                  <Typography variant="body2">contact@glitchbusters.org</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <PhoneIcon />
                  <Typography variant="body2">+1 800 123 4567</Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
            © {new Date().getFullYear()} GlitchBusters. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;