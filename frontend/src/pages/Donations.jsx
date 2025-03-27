import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  InputAdornment,
  Divider,
  Paper,
  Stack,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalance as BankIcon,
  Payments as PaymentsIcon,
  Favorite as HeartIcon,
  LocalCafe as CoffeeIcon,
  Restaurant as MealIcon,
  ShoppingBasket as GroceryIcon,
  Fastfood as FoodIcon
} from '@mui/icons-material';

const Donations = () => {
  // State for donation form
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [activeStep, setActiveStep] = useState(0);
  
  // Donation impact data
  const donationImpact = [
    {
      amount: 10,
      icon: <CoffeeIcon sx={{ fontSize: 40 }} />,
      title: 'Provide 20 Meals',
      description: 'Help us deliver 20 nutritious meals to those in need.'
    },
    {
      amount: 25,
      icon: <MealIcon sx={{ fontSize: 40 }} />,
      title: 'Feed a Family for a Week',
      description: 'Provide a family of four with meals for an entire week.'
    },
    {
      amount: 50,
      icon: <GroceryIcon sx={{ fontSize: 40 }} />,
      title: 'Rescue 100 lbs of Food',
      description: 'Help us rescue 100 pounds of food that would otherwise go to waste.'
    },
    {
      amount: 100,
      icon: <FoodIcon sx={{ fontSize: 40 }} />,
      title: 'Support a Food Pickup Route',
      description: 'Fund an entire food pickup route, connecting multiple businesses with charities.'
    }
  ];

  // Steps for donation process
  const steps = ['Choose Amount', 'Payment Details', 'Confirmation'];

  // Handle donation amount selection
  const handleAmountSelection = (amount) => {
    setDonationAmount(amount);
    setCustomAmount('');
  };

  // Handle custom amount input
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setDonationAmount('custom');
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process donation (would connect to payment processor in real implementation)
    setActiveStep(2); // Move to confirmation step
  };

  // Handle next step
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box className="donations-page">
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
                Support Our Mission
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Your donation helps us reduce food waste and feed communities
              </Typography>
              <Typography variant="body1" paragraph>
                Every dollar you donate helps us rescue more food and deliver it to those who need it most.
                Your generosity directly supports our food rescue operations, volunteer program, and educational initiatives.
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 2 }}
                onClick={() => window.scrollTo({top: 500, behavior: 'smooth'})}
              >
                Donate Now
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Donation impact"
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

      {/* Donation Impact Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
          Your Impact
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          See how your donation makes a difference in our mission to reduce food waste and feed communities.
        </Typography>
        
        <Grid container spacing={4}>
          {donationImpact.map((impact, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {impact.icon}
                  </Box>
                  <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
                    ${impact.amount}
                  </Typography>
                  <Typography variant="h6" component="h3" align="center" gutterBottom>
                    {impact.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {impact.description}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    sx={{ mt: 'auto', pt: 1 }}
                    onClick={() => handleAmountSelection(impact.amount)}
                  >
                    Donate ${impact.amount}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Donation Form Section */}
      <Box sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)', py: 8, mb: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Make a Donation
            </Typography>
            <Typography variant="body1" align="center" paragraph sx={{ mb: 4 }}>
              Your support helps us continue our mission to reduce food waste and feed communities.
            </Typography>
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {activeStep === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom>
                  Select Donation Amount
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {[10, 25, 50, 100].map((amount) => (
                    <Grid item xs={6} sm={3} key={amount}>
                      <Button 
                        variant={donationAmount === amount ? "contained" : "outlined"}
                        color="primary"
                        fullWidth
                        onClick={() => handleAmountSelection(amount)}
                      >
                        ${amount}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                
                <TextField
                  label="Custom Amount"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                  sx={{ mb: 3 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={!donationAmount || (donationAmount === 'custom' && !customAmount)}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}
            
            {activeStep === 1 && (
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h6" gutterBottom>
                  Payment Method
                </Typography>
                
                <FormControl component="fieldset" sx={{ mb: 3 }}>
                  <RadioGroup
                    name="paymentMethod"
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <FormControlLabel 
                      value="creditCard" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CreditCardIcon sx={{ mr: 1 }} />
                          Credit Card
                        </Box>
                      } 
                    />
                    <FormControlLabel 
                      value="bankTransfer" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <BankIcon sx={{ mr: 1 }} />
                          Bank Transfer
                        </Box>
                      } 
                    />
                    <FormControlLabel 
                      value="paypal" 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <PaymentsIcon sx={{ mr: 1 }} />
                          PayPal
                        </Box>
                      } 
                    />
                  </RadioGroup>
                </FormControl>
                
                {paymentMethod === 'creditCard' && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        label="Cardholder Name"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Expiration Date"
                        variant="outlined"
                        placeholder="MM/YY"
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="CVV"
                        variant="outlined"
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                )}
                
                {paymentMethod === 'bankTransfer' && (
                  <Typography variant="body1" paragraph>
                    You will receive our bank details after clicking "Complete Donation".
                  </Typography>
                )}
                
                {paymentMethod === 'paypal' && (
                  <Typography variant="body1" paragraph>
                    You will be redirected to PayPal after clicking "Complete Donation".
                  </Typography>
                )}
                
                <Divider sx={{ my: 3 }} />
                
                <Typography variant="h6" gutterBottom>
                  Donation Summary
                </Typography>
                <Typography variant="body1" paragraph>
                  Donation Amount: ${donationAmount === 'custom' ? customAmount : donationAmount}
                </Typography>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button onClick={handleBack}>Back</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Complete Donation
                  </Button>
                </Box>
              </Box>
            )}
            
            {activeStep === 2 && (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 3,
                  color: 'primary.main'
                }}>
                  <HeartIcon sx={{ fontSize: 60 }} />
                </Box>
                <Typography variant="h4" gutterBottom>
                  Thank You for Your Donation!
                </Typography>
                <Typography variant="body1" paragraph>
                  Your generous contribution of ${donationAmount === 'custom' ? customAmount : donationAmount} will help us reduce food waste and feed communities in need.
                </Typography>
                <Typography variant="body1" paragraph>
                  A confirmation email has been sent to your email address with the details of your donation.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  href="/"
                >
                  Return to Home
                </Button>
              </Box>
            )}
          </Paper>
        </Container>
      </Box>

      {/* Stats Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
          Your Donations at Work
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          See the impact we've made together through the generosity of our donors.
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="p" className="stat-number">
                  5.9M+
                </Typography>
                <Typography variant="h6" component="p">
                  Meals Saved
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="p" className="stat-number">
                  4.7M+
                </Typography>
                <Typography variant="h6" component="p">
                  People Served
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="p" className="stat-number">
                  $2.3M+
                </Typography>
                <Typography variant="h6" component="p">
                  Donations Received
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="stat-card">
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h2" component="p" className="stat-number">
                  92%
                </Typography>
                <Typography variant="h6" component="p">
                  Goes to Programs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Other Ways to Help */}
      <Box sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)', py: 8, mb: 0 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
            Other Ways to Help
          </Typography>
          <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
            Beyond financial donations, there are many ways you can support our mission.
          </Typography>
          
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Volunteer Your Time
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Join our network of volunteers who help with food pickup, delivery, and community events.
                  </Typography>
                  <Button variant="outlined" color="primary">
                    Become a Volunteer
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Partner Your Business
                  </Typography>
                  <Typography variant="body1" paragraph>
                    If you own a restaurant, grocery store, or food business, join our network of food donors.
                  </Typography>
                  <Button variant="outlined" color="primary">
                    Become a Partner
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Spread the Word
                  </Typography>
                  <Typography variant="body1" paragraph>
                    Help us raise awareness about food waste and our mission by sharing our story on social media.
                  </Typography>
                  <Button variant="outlined" color="primary">
                    Share Our Story
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Donations;