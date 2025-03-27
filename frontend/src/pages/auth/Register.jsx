import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  MenuItem,
  Grid,
  CircularProgress
} from '@mui/material';
import { registerStart, registerSuccess, registerFailure } from '../../store/slices/authSlice';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    role: Yup.string().required('Role is required'),
    organization: Yup.object().shape({
      name: Yup.string(),
      address: Yup.string(),
      phone: Yup.string(),
      website: Yup.string(),
      description: Yup.string(),
    }).when('role', {
      is: (role) => role === 'business' || role === 'charity',
      then: (schema) =>
        schema.shape({
          name: Yup.string().required('Organization name is required'),
          address: Yup.string().required('Organization address is required'),
          phone: Yup.string().required('Organization phone is required'),
        }),
      otherwise: (schema) => schema.strip(),
    }),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(registerStart());
      const { confirmPassword, ...registerData } = values;

      console.log("Submitting Data:", JSON.stringify(registerData, null, 2)); // Debugging Log

      const response = await axios.post('http://localhost:5000/api/auth/register', registerData);

      console.log("Registration Success:", response.data); // Debugging Log

      dispatch(registerSuccess(response.data));
      
      const userRole = response.data.user.role;
      let dashboardRoute = '/dashboard';

      switch (userRole) {
        case 'business':
          dashboardRoute = '/dashboard/business';
          break;
        case 'charity':
          dashboardRoute = '/dashboard/charity';
          break;
        case 'volunteer':
          dashboardRoute = '/dashboard/volunteer';
          break;
        case 'admin':
          dashboardRoute = '/dashboard/admin';
          break;
        default:
          dashboardRoute = '/dashboard/business';
      }

      navigate(dashboardRoute);
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      dispatch(registerFailure(err.response?.data?.message || 'Registration failed'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: '#fff'
      }}
    >
      {/* Left side - Registration Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          p: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflowY: 'auto',
          maxHeight: '100vh'
        }}
      >
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ p: 4, borderRadius: 2, bgcolor: 'transparent' }}>
            <Typography component="h1" variant="h4" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              Create Account
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Join the Food Waste Reduction Network
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
                organization: { name: '', address: '', phone: '', website: '', description: '' }
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField fullWidth id="name" name="name" label="Full Name" value={values.name} onChange={handleChange} onBlur={handleBlur} error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth id="email" name="email" label="Email Address" value={values.email} onChange={handleChange} onBlur={handleBlur} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth id="password" name="password" label="Password" type="password" value={values.password} onChange={handleChange} onBlur={handleBlur} error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth id="confirmPassword" name="confirmPassword" label="Confirm Password" type="password" value={values.confirmPassword} onChange={handleChange} onBlur={handleBlur} error={touched.confirmPassword && Boolean(errors.confirmPassword)} helperText={touched.confirmPassword && errors.confirmPassword} />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField fullWidth id="role" name="role" select label="Role" value={values.role} onChange={handleChange} onBlur={handleBlur} error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
                        <MenuItem value="business">Business</MenuItem>
                        <MenuItem value="charity">Charity</MenuItem>
                        <MenuItem value="volunteer">Volunteer</MenuItem>
                        <MenuItem value="admin">Volunteer</MenuItem>
                      </TextField>
                    </Grid>

                    {values.role === 'business' || values.role === 'charity' ? (
                      <>
                        <Grid item xs={12}>
                          <TextField fullWidth id="organization.name" name="organization.name" label="Organization Name" value={values.organization.name} onChange={handleChange} onBlur={handleBlur} error={touched.organization?.name && Boolean(errors.organization?.name)} helperText={touched.organization?.name && errors.organization?.name} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth id="organization.address" name="organization.address" label="Organization Address" value={values.organization.address} onChange={handleChange} onBlur={handleBlur} error={touched.organization?.address && Boolean(errors.organization?.address)} helperText={touched.organization?.address && errors.organization?.address} />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField fullWidth id="organization.phone" name="organization.phone" label="Organization Phone" value={values.organization.phone} onChange={handleChange} onBlur={handleBlur} error={touched.organization?.phone && Boolean(errors.organization?.phone)} helperText={touched.organization?.phone && errors.organization?.phone} />
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" size="large" disabled={loading || isSubmitting} sx={{ mt: 3 }}>
                    {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </Box>

      {/* Right side - Animated Background */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '70%',
          position: 'relative',
          bgcolor: '#001F2D',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '80%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0, 31, 45, 0.95), rgba(21, 101, 192, 0.9))',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6,
          }}
        >
          {/* Network Animation Container */}
          <Box
            sx={{
              width: '100%',
              height: '5%', // Increased height
              position: 'relative',
              mb: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 5, // Added top margin
            }}
          >
            {/* Connected Nodes Animation */}
            <Box sx={{ position: 'relative', width: '320px', height: '320px' }}> {/* Increased size */}
              {/* Central Node */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  bgcolor: '#64B5F6',
                  boxShadow: '0 0 20px rgba(100, 181, 246, 0.6)',
                  animation: 'pulse 2s infinite',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '24px',
                  zIndex: 2
                }}
              >
                🏠
              </Box>
              
              {/* Orbiting Nodes */}
              {['🏪', '🏢', '👥'].map((emoji, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 45,
                    height: 45,
                    borderRadius: '50%',
                    bgcolor: '#4CAF50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: `orbit ${5 + index}s linear infinite`,
                    transform: `rotate(${120 * index}deg)`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      width: '220px', // Increased orbit radius
                      height: '220px',
                      border: '1px dashed rgba(255,255,255,0.3)',
                      borderRadius: '50%',
                      animation: 'spin 20s linear infinite'
                    }
                  }}
                >
                  {emoji}
                </Box>
              ))}
            </Box>
          </Box>

          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              mb: 4,
              textAlign: 'center',
              animation: 'fadeInUp 0.8s ease-out',
              fontSize: { xs: '2rem', md: '2.5rem' }
            }}
          >
            Join Our Network
          </Typography>

          {/* Features List */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3,
            width: '100%',
            maxWidth: '400px'
          }}>
            {[
              { text: 'Business Accounts', icon: '🏪' },
              { text: 'Charity Accounts', icon: '🏢' },
              { text: 'Volunteer & Community', icon: '👥' }
            ].map((item, index) => (
              <Box
                key={item.text}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#fff',
                  animation: `fadeInLeft ${0.5 + index * 0.2}s ease-out`,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.2)',
                    transform: 'translateX(10px)'
                  }
                }}
              >
                <Typography sx={{ mr: 2, fontSize: '1.5rem' }}>{item.icon}</Typography>
                <Typography variant="body1">{item.text}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Animated Background Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            background: 'url("/grid-pattern.svg")',
            backgroundSize: '30px 30px',
            animation: 'slide 20s linear infinite',
            zIndex: 1
          }}
        />
      </Box>
    </Box>
  );
};

export default Register;
