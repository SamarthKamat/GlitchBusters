import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Stack,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {
  Search as SearchIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  LocalOffer as TagIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const Blog = () => {
  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: 'How Restaurants Can Reduce Food Waste and Increase Profits',
      excerpt: 'Discover practical strategies for restaurants to minimize food waste while improving their bottom line.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Sarah Johnson',
      date: 'May 15, 2023',
      tags: ['Restaurants', 'Business Tips', 'Sustainability']
    },
    {
      id: 2,
      title: 'The Environmental Impact of Food Waste: What You Need to Know',
      excerpt: 'Learn about the surprising environmental consequences of food waste and why reducing it matters for our planet.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1313&q=80',
      author: 'Michael Chen',
      date: 'April 22, 2023',
      tags: ['Environment', 'Climate Change', 'Sustainability']
    },
    {
      id: 3,
      title: 'Community Heroes: Volunteers Making a Difference',
      excerpt: 'Meet the dedicated volunteers who are helping to rescue food and feed communities across the country.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd59a0c3a9a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Priya Patel',
      date: 'March 10, 2023',
      tags: ['Volunteers', 'Community', 'Inspiration']
    },
    {
      id: 4,
      title: 'Food Safety Guidelines for Donations: What Charities Need to Know',
      excerpt: 'Important food safety information for charities and food banks accepting and distributing donated food.',
      image: 'https://images.unsplash.com/photo-1576402187878-974f70c890a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1333&q=80',
      author: 'David Wilson',
      date: 'February 28, 2023',
      tags: ['Food Safety', 'Charities', 'Guidelines']
    },
    {
      id: 5,
      title: 'Tech Solutions for Food Waste: Innovations Making a Difference',
      excerpt: 'Explore how technology is helping to connect food donors with recipients and reduce waste in the process.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Michael Chen',
      date: 'January 15, 2023',
      tags: ['Technology', 'Innovation', 'Solutions']
    },
    {
      id: 6,
      title: 'From Farm to Landfill: Understanding the Food Waste Journey',
      excerpt: 'A comprehensive look at how food moves through the supply chain and where waste occurs along the way.',
      image: 'https://images.unsplash.com/photo-1595855759920-86582396756a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      author: 'Sarah Johnson',
      date: 'December 5, 2022',
      tags: ['Supply Chain', 'Education', 'Sustainability']
    }
  ];

  // Featured post (first post)
  const featuredPost = blogPosts[0];

  // Popular tags
  const popularTags = [
    'Sustainability',
    'Food Waste',
    'Restaurants',
    'Charities',
    'Volunteers',
    'Community',
    'Technology',
    'Environment',
    'Tips & Tricks'
  ];

  return (
    <Box className="blog-page">
      {/* Hero Section */}
      <Box 
        sx={{
          bgcolor: 'rgba(46, 125, 50, 0.1)',
          py: 10,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" className="section-title" align="center" gutterBottom>
            Our Blog
          </Typography>
          <Typography variant="h5" color="text.secondary" align="center" gutterBottom sx={{ maxWidth: 800, mx: 'auto', mb: 4 }}>
            Insights, stories, and news about food waste reduction and community impact
          </Typography>
          
          <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search articles..."
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Featured Post */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Featured Article
        </Typography>
        <Card sx={{ display: { md: 'flex' }, mb: 4 }}>
          <CardMedia
            component="img"
            sx={{ width: { md: '50%' }, height: { xs: 240, md: 'auto' } }}
            image={featuredPost.image}
            alt={featuredPost.title}
          />
          <CardContent sx={{ flex: '1 0 auto', p: 4 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              {featuredPost.tags.slice(0, 2).map((tag, index) => (
                <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
              ))}
            </Box>
            <Typography variant="h4" component="h3" gutterBottom>
              {featuredPost.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {featuredPost.excerpt}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <PersonIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary" sx={{ mr: 3 }}>
                {featuredPost.author}
              </Typography>
              <CalendarIcon sx={{ mr: 1, fontSize: 20, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {featuredPost.date}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="primary"
              endIcon={<ArrowForwardIcon />}
            >
              Read More
            </Button>
          </CardContent>
        </Card>
      </Container>

      {/* Latest Articles */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2">
            Latest Articles
          </Typography>
          <Button color="primary" endIcon={<ArrowForwardIcon />}>
            View All
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {blogPosts.slice(1).map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    {post.tags.slice(0, 1).map((tag, index) => (
                      <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
                    ))}
                  </Box>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    {post.excerpt}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
                      {post.author}
                    </Typography>
                    <CalendarIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {post.date}
                    </Typography>
                  </Box>
                  <Button 
                    variant="text" 
                    color="primary"
                    endIcon={<ArrowForwardIcon />}
                    sx={{ mt: 'auto', p: 0 }}
                  >
                    Read More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Categories and Tags */}
      <Box sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Categories
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    Sustainability
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    Food Waste Tips
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    Success Stories
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    Community Impact
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    Partner Spotlights
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    sx={{ justifyContent: 'flex-start', py: 1.5, mb: 2 }}
                  >
                    News & Updates
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h2" gutterBottom>
                Popular Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {popularTags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    color="primary" 
                    variant="outlined"
                    sx={{ mb: 1 }}
                    clickable
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Newsletter Signup */}
      <Container maxWidth="md" sx={{ mb: 10 }}>
        <Card sx={{ p: { xs: 3, md: 5 }, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
              Stay updated with the latest articles, tips, and news about food waste reduction and our community impact.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="outlined"
                sx={{
                  bgcolor: 'white',
                  borderRadius: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main', 
                  '&:hover': { bgcolor: '#f5f5f5' },
                  px: 4,
                  whiteSpace: 'nowrap'
                }}
              >
                Subscribe
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Blog;