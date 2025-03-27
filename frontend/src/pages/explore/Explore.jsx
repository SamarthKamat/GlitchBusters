import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Chip,
  Stack
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Explore = () => {
  const recommendations = [
    {
      title: "Fresh Produce",
      description: "Fresh vegetables and fruits from local markets",
      image: "/assets/fresh-produce.jpg",
      tags: ["Vegetables", "Fruits", "Fresh"]
    },
    {
      title: "Bakery Items",
      description: "Day-old bread and pastries from local bakeries",
      image: "/assets/bakery.jpg",
      tags: ["Bread", "Pastries", "Baked Goods"]
    },
    {
      title: "Restaurant Surplus",
      description: "Quality prepared meals from partner restaurants",
      image: "/assets/restaurant.jpg",
      tags: ["Prepared", "Meals", "Restaurant"]
    }
  ];

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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Stack direction="row" spacing={1}>
          <Chip label="Near Me" onClick={() => {}} />
          <Chip label="Available Now" onClick={() => {}} />
          <Chip label="Vegetables" onClick={() => {}} />
          <Chip label="Fruits" onClick={() => {}} />
          <Chip label="Bread" onClick={() => {}} />
        </Stack>
      </Box>

      {/* Recommendations */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Recommended For You
      </Typography>
      <Grid container spacing={3}>
        {recommendations.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {item.description}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {item.tags.map((tag, tagIndex) => (
                    <Chip key={tagIndex} label={tag} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Explore;