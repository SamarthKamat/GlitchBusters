import React from 'react';
import { motion } from 'framer-motion';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Divider,
  Paper,
  Avatar,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

const About = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      bio: 'Food sustainability expert with 10+ years in waste management',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
    },
    // Keep other team members...
  ];

  const values = [
    {
      title: 'Reduce Waste',
      description: 'Save millions of meals from landfills annually'
    },
    {
      title: 'Community Focus',
      description: 'Serve vulnerable populations through local partnerships'
    },
    {
      title: 'Tech Driven',
      description: 'AI-powered logistics for efficient distribution'
    }
  ];

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8 }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <motion.div {...fadeIn}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Fighting Hunger, Reducing Waste
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Connecting surplus food with communities in need through technology
          </Typography>
        </Box>

        <Grid container spacing={6} alignItems="center" sx={{ mb: 12 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              At GlitchBusters, we bridge the gap between food surplus and 
              food insecurity using real-time data and community networks.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <Paper
                elevation={3}
                sx={{
                  height: 400,
                  overflow: 'hidden',
                  borderRadius: 4
                }}
              >
                <Box
                  component="img"
                  src="/food-rescue.jpg"
                  alt="Food rescue team"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Paper>
            </motion.div>
          </Grid>
        </Grid>

        {/* Values Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Our Impact
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Card
                    elevation={2}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        transition: 'transform 0.3s ease-in-out'
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Team Section */}
        <Box sx={{ py: 8 }}>
          <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
            Our Team
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={2}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={member.image}
                    alt={member.name}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
};

export default About;