import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

const Initiatives = () => {
  // Initiatives data
  const initiatives = [
    {
      title: 'Food Rescue Network',
      description: 'Our core program connecting businesses with surplus food to local charities and food banks.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      icon: <DeliveryIcon />,
      stats: [
        { label: 'Meals Saved', value: '5.9M+' },
        { label: 'Business Partners', value: '1062+' },
        { label: 'Charity Partners', value: '510+' }
      ]
    },
    {
      title: 'Volunteer Program',
      description: 'Engage community members to help with food pickup, delivery, and awareness campaigns.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      icon: <VolunteerIcon />,
      stats: [
        { label: 'Active Volunteers', value: '3,200+' },
        { label: 'Volunteer Hours', value: '45K+' },
        { label: 'Cities Covered', value: '50+' }
      ]
    },
    {
      title: 'Food Waste Education',
      description: 'Educational programs for schools, businesses, and communities about reducing food waste.',
      image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      icon: <EducationIcon />,
      stats: [
        { label: 'Schools Reached', value: '320+' },
        { label: 'Workshops Held', value: '750+' },
        { label: 'People Educated', value: '25K+' }
      ]
    },
    {
      title: 'Awareness Campaigns',
      description: 'Public awareness campaigns to highlight food waste issues and promote sustainable solutions.',
      image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      icon: <CampaignIcon />,
      stats: [
        { label: 'Campaigns Run', value: '24+' },
        { label: 'Media Mentions', value: '150+' },
        { label: 'Social Reach', value: '2.5M+' }
      ]
    },
    {
      title: 'Business Partnership Program',
      description: 'Helping businesses implement food waste reduction strategies and connect with our platform.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
      icon: <BusinessIcon />,
      stats: [
        { label: 'Business Partners', value: '1062+' },
        { label: 'Food Saved (tons)', value: '2,450+' },
        { label: 'Cost Savings', value: '$3.2M+' }
      ]
    }
  ];

  // Upcoming initiatives
  const upcomingInitiatives = [
    {
      title: 'Mobile App Launch',
      description: 'Making it even easier for businesses and charities to connect on the go.',
      timeline: 'Q3 2023'
    },
    {
      title: 'International Expansion',
      description: 'Taking our successful model to help communities in other countries.',
      timeline: 'Q4 2023'
    },
    {
      title: 'Food Waste Analytics',
      description: 'Advanced data insights to help businesses further reduce their food waste.',
      timeline: 'Q1 2024'
    }
  ];

  return (
    <Box className="initiatives-page">
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'rgba(46, 125, 50, 0.1)',
          py: 10,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" className="section-title" gutterBottom>
                Our Initiatives
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Programs that make a difference
              </Typography>
              <Typography variant="body1" paragraph>
                At GlitchBusters, we run several key initiatives to reduce food waste and address hunger in our communities.
                Each program is designed to tackle different aspects of the food waste problem while creating meaningful
                connections between businesses, charities, and volunteers.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 2 }}
                component={RouterLink}
                to="/register"
              >
                Join Our Cause
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Food donation volunteers"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                  boxShadow: 3
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Main Initiatives Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
          Our Programs
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          Explore our comprehensive approach to reducing food waste and feeding communities through these key initiatives.
        </Typography>
        
        {initiatives.map((initiative, index) => (
          <Box key={index} sx={{ mb: 8 }}>
            <Grid container spacing={4} direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
              <Grid item xs={12} md={6}>
                <Box 
                  component="img"
                  src={initiative.image}
                  alt={initiative.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    boxShadow: 3
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    mr: 2, 
                    bgcolor: 'primary.main', 
                    color: 'white', 
                    p: 1, 
                    borderRadius: '50%',
                    display: 'flex'
                  }}>
                    {initiative.icon}
                  </Box>
                  <Typography variant="h4" component="h3">
                    {initiative.title}
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  {initiative.description}
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {initiative.stats.map((stat, statIndex) => (
                    <Grid item xs={4} key={statIndex}>
                      <Card sx={{ height: '100%' }}>
                        <CardContent>
                          <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                <Button 
                  variant="outlined" 
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                >
                  Learn More
                </Button>
              </Grid>
            </Grid>
            {index < initiatives.length - 1 && (
              <Divider sx={{ my: 6 }} />
            )}
          </Box>
        ))}
      </Container>

      {/* Upcoming Initiatives */}
      <Box sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
            Coming Soon
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            We're constantly evolving and expanding our initiatives to make an even bigger impact.
          </Typography>
          
          <Grid container spacing={4}>
            {upcomingInitiatives.map((initiative, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Chip 
                      label={initiative.timeline} 
                      color="primary" 
                      size="small" 
                      sx={{ mb: 2 }}
                    />
                    <Typography variant="h5" component="h3" gutterBottom>
                      {initiative.title}
                    </Typography>
                    <Typography variant="body1">
                      {initiative.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Get Involved CTA */}
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: 10 }}>
        <Typography variant="h3" component="h2" gutterBottom>
          Get Involved
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          There are many ways to support our initiatives and help us reduce food waste while feeding communities.
          Whether you're a business with surplus food, a charity in need of donations, or an individual looking to volunteer,
          we have a place for you in our network.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/register"
            >
              Join Now
            </Button>
          </Grid>
          <Grid item>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/contact"
            >
              Contact Us
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Initiatives;