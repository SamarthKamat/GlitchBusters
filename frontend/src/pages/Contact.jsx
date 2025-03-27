import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon
} from '@mui/icons-material';

const Contact = () => {
  // State for contact form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Contact information
  const contactInfo = [
    {
      icon: <EmailIcon sx={{ fontSize: 40 }} />,
      title: 'Email Us',
      details: 'contact@glitchbusters.org',
      description: 'For general inquiries and support'
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Call Us',
      details: '+1 800 123 4567',
      description: 'Monday to Friday, 9am to 5pm EST'
    },
    {
      icon: <LocationIcon sx={{ fontSize: 40 }} />,
      title: 'Visit Us',
      details: '123 Food Rescue Street, New York, NY 10001',
      description: 'Our headquarters location'
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: 'How can my business donate surplus food?',
      answer: 'Businesses can sign up for a free account on our platform. Once registered, you can list available surplus food, and our system will match you with nearby charities. Our volunteers can also help with pickup if needed.'
    },
    {
      question: 'How do I volunteer with GlitchBusters?',
      answer: 'You can sign up as a volunteer on our platform. After registration, you can choose from various volunteer opportunities including food pickup, delivery, event support, and awareness campaigns.'
    },
    {
      question: 'I represent a charity. How can we receive food donations?',
      answer: 'Charities can register for a free account on our platform. Once verified, you can browse and claim available food donations in your area. You can also set up preferences to receive alerts when specific types of food become available.'
    },
    {
      question: 'Is my financial donation tax-deductible?',
      answer: 'Yes, GlitchBusters is a registered 501(c)(3) non-profit organization, and all financial donations are tax-deductible to the extent allowed by law. You will receive a receipt for your donation that can be used for tax purposes.'
    },
    {
      question: 'How is the donated food transported?',
      answer: 'We use a combination of methods. Some charities pick up directly from businesses, our volunteers help with delivery, and in some areas, we have dedicated transportation services. All food is transported following proper food safety guidelines.'
    }
  ];

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission (would connect to backend in real implementation)
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <Box className="contact-page">
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
                Contact Us
              </Typography>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                We'd love to hear from you
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about our food waste reduction network? Want to get involved as a business, charity, or volunteer?
                Our team is here to help. Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80"
                alt="Contact us"
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

      {/* Contact Information Cards */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {contactInfo.map((info, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {info.icon}
                </Box>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  {info.title}
                </Typography>
                <Typography variant="body1" align="center" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {info.details}
                </Typography>
                <Typography variant="body2" align="center" color="text.secondary">
                  {info.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Contact Form and Map Section */}
      <Box sx={{ bgcolor: 'rgba(46, 125, 50, 0.05)', py: 8, mb: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Send Us a Message
                </Typography>
                <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                  Fill out the form below and we'll get back to you as soon as possible.
                </Typography>
                
                {formSubmitted ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <SendIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                      Thank You!
                    </Typography>
                    <Typography variant="body1">
                      Your message has been sent successfully. We'll get back to you soon.
                    </Typography>
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ mt: 3 }}
                      onClick={() => setFormSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </Box>
                ) : (
                  <Box component="form" onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="name"
                          label="Your Name"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="email"
                          label="Your Email"
                          variant="outlined"
                          fullWidth
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="subject"
                          label="Subject"
                          variant="outlined"
                          fullWidth
                          required
                          value={formData.subject}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          name="message"
                          label="Your Message"
                          variant="outlined"
                          fullWidth
                          required
                          multiline
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="large"
                          endIcon={<SendIcon />}
                        >
                          Send Message
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} sx={{ p: 0, borderRadius: 2, height: '100%', overflow: 'hidden' }}>
                <Box sx={{ height: '100%', minHeight: 400 }}>
                  {/* Google Maps iframe would go here in a real implementation */}
                  <Box 
                    component="img"
                    src="https://maps.googleapis.com/maps/api/staticmap?center=New+York,NY&zoom=13&size=600x400&key=YOUR_API_KEY"
                    alt="Map location"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Typography variant="h3" component="h2" className="section-title" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" align="center" paragraph sx={{ maxWidth: 800, mx: 'auto', mb: 6 }}>
          Find answers to common questions about our food waste reduction network.
        </Typography>
        
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          {faqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="h6">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#2E7D32', color: 'white', py: 8, mb: 0 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" component="h2" gutterBottom>
            Join Our Mission Today
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Whether you're a business with surplus food, a charity in need of donations, or an individual looking to make a difference,
            we invite you to join our food waste reduction network.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button 
                variant="contained" 
                color="secondary"
                size="large"
                sx={{ bgcolor: 'white', color: '#2E7D32', '&:hover': { bgcolor: '#f5f5f5' } }}
              >
                Register Now
              </Button>
            </Grid>
            <Grid item>
              <Button 
                variant="outlined" 
                color="secondary"
                size="large"
                sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: '#f5f5f5', bgcolor: 'rgba(255,255,255,0.1)' } }}
              >
                Learn More
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;