import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SafetyChecklist from '../../components/impact/SafetyChecklist';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  Alert,
  AlertTitle
} from '@mui/material';
import EcoIcon from '@mui/icons-material/Eco';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Co2Icon from '@mui/icons-material/Co2';
import WaterIcon from '@mui/icons-material/Water';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import WarningIcon from '@mui/icons-material/Warning';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const ImpactDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [impactData, setImpactData] = useState({
    totalFoodSaved: 0,
    totalMealsDonated: 0,
    co2Reduction: 0,
    waterSaved: 0,
    peopleServed: 0,
    donationsByCategory: [],
    monthlyImpact: [],
    topContributors: []
  });
  const [regulatoryAlerts, setRegulatoryAlerts] = useState([]);
  const { alerts } = useSelector((state) => state.alert);
  const [recentAlerts, setRecentAlerts] = useState([]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  // Filter alerts related to food safety and regulations
  useEffect(() => {
    const foodSafetyAlerts = alerts.filter(
      (alert) => alert.type === 'warning' || alert.type === 'info'
    ).slice(0, 5);
    setRecentAlerts(foodSafetyAlerts);
  }, [alerts]);

  useEffect(() => {
    const fetchImpactData = async () => {
      setLoading(true);
      try {
        // In a real application, this would be an API call to fetch impact data
        // For now, we'll simulate the data
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockImpactData = {
          totalFoodSaved: 2750, // in kg
          totalMealsDonated: 8250,
          co2Reduction: 5225, // in kg
          waterSaved: 4125000, // in liters
          peopleServed: 3300,
          donationsByCategory: [
            { name: 'Produce', value: 35 },
            { name: 'Dairy', value: 20 },
            { name: 'Bakery', value: 15 },
            { name: 'Meat', value: 10 },
            { name: 'Prepared Foods', value: 12 },
            { name: 'Other', value: 8 }
          ],
          monthlyImpact: [
            { month: 'Jan', foodSaved: 150, mealsDonated: 450, co2Reduced: 285 },
            { month: 'Feb', foodSaved: 200, mealsDonated: 600, co2Reduced: 380 },
            { month: 'Mar', foodSaved: 250, mealsDonated: 750, co2Reduced: 475 },
            { month: 'Apr', foodSaved: 300, mealsDonated: 900, co2Reduced: 570 },
            { month: 'May', foodSaved: 350, mealsDonated: 1050, co2Reduced: 665 },
            { month: 'Jun', foodSaved: 400, mealsDonated: 1200, co2Reduced: 760 },
            { month: 'Jul', foodSaved: 450, mealsDonated: 1350, co2Reduced: 855 },
            { month: 'Aug', foodSaved: 500, mealsDonated: 1500, co2Reduced: 950 },
            { month: 'Sep', foodSaved: 150, mealsDonated: 450, co2Reduced: 285 }
          ],
          topContributors: [
            { name: 'Metro Supermarket', donations: 450, meals: 1350 },
            { name: 'Fresh Foods Co.', donations: 380, meals: 1140 },
            { name: 'City Bakery', donations: 320, meals: 960 },
            { name: 'Green Grocers', donations: 280, meals: 840 },
            { name: 'Farm to Table', donations: 220, meals: 660 }
          ]
        };
        
        setImpactData(mockImpactData);
        
        // Mock regulatory alerts
        setRegulatoryAlerts([
          {
            id: 1,
            title: 'Food Safety Reminder',
            description: 'Ensure all perishable items are stored at appropriate temperatures during transport.',
            severity: 'info'
          },
          {
            id: 2,
            title: 'New Donation Guidelines',
            description: 'Updated guidelines for prepared food donations now require detailed ingredient lists.',
            severity: 'warning'
          },
          {
            id: 3,
            title: 'Allergen Labeling',
            description: 'All food donations must clearly indicate common allergens present in the items.',
            severity: 'warning'
          }
        ]);
      } catch (error) {
        console.error('Error fetching impact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImpactData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const StatCard = ({ title, value, unit, icon, color }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: `${color}.light`,
              color: `${color}.main`,
              mr: 2
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div">
          {value.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {unit}
        </Typography>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Impact Dashboard
      </Typography>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 4 }}
      >
        <Tab label="Impact Metrics" />
        <Tab label="Sustainability" />
        <Tab label="Regulatory Compliance" />
      </Tabs>

      {tabValue === 0 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Food Saved"
                value={impactData.totalFoodSaved}
                unit="kilograms"
                icon={<FoodIcon />}
                color="success"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="Meals Donated"
                value={impactData.totalMealsDonated}
                unit="meals"
                icon={<HeartIcon />}
                color="error"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <StatCard
                title="People Served"
                value={impactData.peopleServed}
                unit="individuals"
                icon={<PeopleIcon />}
                color="info"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Monthly Impact
          </Typography>

          <Paper sx={{ p: 3, mb: 4 }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={impactData.monthlyImpact}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="foodSaved" name="Food Saved (kg)" fill="#4caf50" />
                <Bar dataKey="mealsDonated" name="Meals Donated" fill="#f44336" />
                <Bar dataKey="co2Reduced" name="CO2 Reduced (kg)" fill="#2196f3" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Top Contributors
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Top Donors
                </Typography>
                <List>
                  {impactData.topContributors.map((contributor, index) => (
                    <ListItem key={index} divider={index !== impactData.topContributors.length - 1}>
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 32,
                            height: 32,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold'
                          }}
                        >
                          {index + 1}
                        </Box>
                      </ListItemIcon>
                      <ListItemText
                        primary={contributor.name}
                        secondary={`${contributor.donations} kg donated (${contributor.meals} meals)`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Donations by Category
                </Typography>
                <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={impactData.donationsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {impactData.donationsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {tabValue === 1 && (
        <>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <StatCard
                title="CO2 Emissions Reduced"
                value={impactData.co2Reduction}
                unit="kilograms"
                icon={<CarbonIcon />}
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <StatCard
                title="Water Saved"
                value={impactData.waterSaved / 1000}
                unit="cubic meters"
                icon={<WaterIcon />}
                color="info"
              />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ mb: 3 }}>
            Environmental Impact
          </Typography>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    What Your Impact Means
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <CarbonIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${impactData.co2Reduction.toLocaleString()} kg of CO2 emissions prevented`}
                        secondary="Equivalent to taking 1.1 cars off the road for a year"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <WaterIcon color="info" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${(impactData.waterSaved / 1000).toLocaleString()} cubic meters of water saved`}
                        secondary="Equivalent to 51,500 ten-minute showers"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                          <EcoIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${impactData.totalFoodSaved.toLocaleString()} kg of food diverted from landfill`}
                        secondary="Reducing methane emissions and soil contamination"
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Sustainability Tips
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <ShippingIcon color="warning" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Optimize Delivery Routes"
                        secondary="Plan multiple pickups and deliveries in the same area to reduce transportation emissions"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <FoodIcon color="success" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Proper Food Storage"
                        secondary="Store food at appropriate temperatures to extend shelf life and reduce waste"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EcoIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Eco-friendly Packaging"
                        secondary="Use reusable or biodegradable containers for food transport when possible"
                      />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      {tabValue === 2 && (
        <>
          <Typography variant="h5" sx={{ mb: 3 }}>
            Regulatory Compliance & Safety Guidelines
          </Typography>
          
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Real-Time Alerts
            </Typography>
            <Box sx={{ mb: 3 }}>
              {recentAlerts.length > 0 ? (
                recentAlerts.map((alert) => (
                  <Alert
                    key={alert.id}
                    severity={alert.type === 'warning' ? 'warning' : 'info'}
                    sx={{ mb: 2 }}
                  >
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.message}
                  </Alert>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No real-time alerts at this moment. Alerts will appear here as they are received.
                </Typography>
              )}
            </Box>
          </Paper>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Food Safety Alerts
            </Typography>
            <Box sx={{ mb: 3 }}>
              {regulatoryAlerts.map((alert) => (
                <Alert
                  key={alert.id}
                  severity={alert.severity}
                  sx={{ mb: 2 }}
                  icon={<WarningIcon />}
                >
                  <AlertTitle>{alert.title}</AlertTitle>
                  {alert.description}
                </Alert>
              ))}
            </Box>

            <Typography variant="h6" gutterBottom>
              Food Donation Guidelines
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Temperature Control"
                  secondary="Perishable foods must be kept at safe temperatures (below 40°F or above 140°F) during transport"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Labeling Requirements"
                  secondary="All donated food must be properly labeled with contents, allergens, and use-by dates"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Packaging Standards"
                  secondary="Food must be in sealed, food-grade packaging to prevent contamination"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <WarningIcon color="warning" />
                </ListItemIcon>
                <ListItemText
                  primary="Transportation Requirements"
                  secondary="Vehicles used for food transport must be clean and maintained to prevent contamination"
                />
              </ListItem>
            </List>

            <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
              Legal Protections
            </Typography>
            <Alert severity="info" sx={{ mb: 2 }}>
              <AlertTitle>Good Samaritan Food Donation Act</AlertTitle>
              Donors are protected from liability when donating food in good faith to nonprofit organizations.
            </Alert>
            <Alert severity="info" sx={{ mb: 4 }}>
              <AlertTitle>Tax Benefits</AlertTitle>
              Businesses may qualify for enhanced tax deductions for food donations. Consult with a tax professional for details.
            </Alert>
          </Paper>
          
          <Typography variant="h5" sx={{ mb: 3 }}>
            Safety Compliance Checklist
          </Typography>
          
          <SafetyChecklist />
        </>
      )}
    </Box>
  );
};

export default ImpactDashboard;