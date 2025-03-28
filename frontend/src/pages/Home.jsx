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
  useTheme,
  LinearProgress,
  IconButton // Add this import
} from '@mui/material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
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

  // Sample data for Impact Dashboard
  const monthlyData = [
    { month: 'Jan', foodSaved: 1200, mealsProvided: 4800 },
    { month: 'Feb', foodSaved: 1500, mealsProvided: 6000 },
    { month: 'Mar', foodSaved: 1800, mealsProvided: 7200 },
    { month: 'Apr', foodSaved: 2100, mealsProvided: 8400 },
    { month: 'May', foodSaved: 2400, mealsProvided: 9600 },
    { month: 'Jun', foodSaved: 2700, mealsProvided: 10800 }
  ];

  const categoryData = [
    { category: 'Produce', amount: 3500 },
    { category: 'Bakery', amount: 2800 },
    { category: 'Dairy', amount: 2000 },
    { category: 'Prepared', amount: 1500 }
  ];

 // Add these constants at the top of the component, after the stats array
 const socialLinks = { 
  facebook: 'https://facebook.com/glitchbusters',
  linkedin: 'https://linkedin.com/company/glitchbusters',
  instagram: 'https://instagram.com/glitchbusters',
  youtube: 'https://youtube.com/@glitchbusters'
};
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
              <IconButton 
                href={socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', p: 0 }}
              >
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', p: 0 }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', p: 0 }}
              >
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton 
                href={socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ color: 'white', p: 0 }}
              >
                <YouTubeIcon fontSize="small" />
              </IconButton>
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
              <Typography variant="body1" component={RouterLink} to="/" sx={{ fontWeight: 600, textDecoration: 'none', color: 'inherit' }}>Home</Typography>
              <Typography variant="body1" component={RouterLink} to="/about" sx={{ textDecoration: 'none', color: 'inherit' }}>About</Typography>
              <Typography variant="body1" component={RouterLink} to="/initiatives" sx={{ textDecoration: 'none', color: 'inherit' }}>Our Initiatives</Typography>
              <Typography variant="body1" component={RouterLink} to="/donations" sx={{ textDecoration: 'none', color: 'inherit' }}>Donations</Typography>
              <Typography variant="body1" component={RouterLink} to="/contact" sx={{ textDecoration: 'none', color: 'inherit' }}>Contact Us</Typography>
              <Typography variant="body1" component={RouterLink} to="/blog" sx={{ textDecoration: 'none', color: 'inherit' }}>Blog</Typography>
            </Stack>
            <Button
              variant="contained"
              component={RouterLink}
              to="/donations"
              sx={{
                bgcolor: '#4CAF50',
                '&:hover': { bgcolor: '#2E7D32' },
                borderRadius: '20px',
                px: 3,
                textDecoration: 'none'
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

      {/* Video Section */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#000' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                }}
              >
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  src="https://www.youtube.com/embed/ishA6kry8nc"
                  title="Food Waste Impact"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', pl: { md: 6 } }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    background: 'linear-gradient(45deg, #4CAF50, #81C784)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  See Our Impact
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, color: 'rgba(255,255,255,0.9)' }}>
                  Watch how our network of volunteers, businesses, and charities work together to reduce food waste and feed communities in need.
                </Typography>
                <Box
                  sx={{
                    p: 3,
                    bgcolor: 'rgba(76, 175, 80, 0.1)',
                    borderRadius: '16px',
                    border: '1px solid rgba(76, 175, 80, 0.2)',
                  }}
                >
                  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>
                    "Every year, approximately 1.3 billion tonnes of food is wasted globally. Together, we can make a difference."
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
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
      <Box 
        sx={{
          bgcolor: '#2E7D32',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 60%)',
            animation: 'pulse 4s ease-in-out infinite'
          }
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -20,
                  left: -20,
                  width: '120%',
                  height: '120%',
                  background: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
                  animation: 'pulse 4s ease-in-out infinite'
                }
              }}>
                <Typography 
                  variant="h2" 
                  gutterBottom 
                  sx={{
                    fontWeight: 700,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '60%',
                      height: '4px',
                      background: 'linear-gradient(90deg, rgba(255,255,255,0.8), transparent)',
                      animation: 'width 2s ease-in-out'
                    }
                  }}
                >
                  Make an Impact Today
                </Typography>
                <Typography 
                  variant="h6" 
                  paragraph 
                  sx={{
                    opacity: 0.9,
                    mb: 4,
                    lineHeight: 1.8,
                    position: 'relative',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    animation: 'fadeIn 1s ease-in'
                  }}
                >
                  Join our network and help reduce food waste while supporting those
                  in need in your community. Every meal saved is a step towards a more
                  sustainable and equitable future.
                </Typography>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2}
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    '& > *': {
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      }
                    }
                  }}
                >
                  <Button
                    component={RouterLink}
                    to="/register"
                    variant="contained"
                    size="large"
                    sx={{
                      bgcolor: 'white',
                      color: '#2E7D32',
                      '&:hover': { 
                        bgcolor: '#f0f0f0',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      },
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none'
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
                      borderWidth: '2px',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                      },
                      px: 4,
                      py: 1.5,
                      borderRadius: '30px',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none'
                    }}
                  >
                    Sign In
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Grid container spacing={3}>
                  {stats.map((stat, index) => (
                    <Grid item xs={6} key={index}>
                      <Paper
                        sx={{
                          p: 3,
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          borderRadius: '16px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          transition: 'all 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                          }
                        }}
                      >
                        <Typography variant="h3" sx={{ 
                          color: 'white', 
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          fontSize: { xs: '1.8rem', md: '2.2rem' }
                        }}>
                          <span style={{ fontSize: '1.5em' }}>{stat.icon}</span>
                          {stat.value}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 1 }}>
                          {stat.label}
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={75 + index * 5}
                          sx={{
                            mt: 2,
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: 'white'
                            },
                            height: 6,
                            borderRadius: 3
                          }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
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

      {/* Impact Dashboard Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#f9f9f9' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ fontWeight: 700, mb: 6, color: '#2E7D32' }}
          >
            Our Impact
          </Typography>

          {/* Key Metrics */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Food Saved
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    5.9M kg
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ mt: 2, bgcolor: '#C8E6C9' }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Meals Provided
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    4.7M
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={80} 
                    sx={{ mt: 2, bgcolor: '#C8E6C9' }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Active Donors
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    1062
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={65} 
                    sx={{ mt: 2, bgcolor: '#C8E6C9' }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', bgcolor: '#E8F5E9' }}>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Partner Charities
                  </Typography>
                  <Typography variant="h4" component="div" sx={{ color: '#2E7D32' }}>
                    510
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={70} 
                    sx={{ mt: 2, bgcolor: '#C8E6C9' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Monthly Impact</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="foodSaved" 
                      stroke="#2E7D32" 
                      name="Food Saved (kg)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mealsProvided" 
                      stroke="#4CAF50" 
                      name="Meals Provided"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Food Categories</Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#4CAF50" name="Amount (kg)" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
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
                <IconButton 
                  href={socialLinks.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: '#4267B2' } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  href={socialLinks.linkedin} 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: '#0077B5' } }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: '#E4405F' } }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  href={socialLinks.youtube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: '#FF0000' } }}
                >
                  <YouTubeIcon />
                </IconButton>
                <IconButton 
                  href="https://wa.me/18001234567" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ color: 'white', '&:hover': { color: '#25D366' } }}
                >
                  <WhatsAppIcon />
                </IconButton>
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