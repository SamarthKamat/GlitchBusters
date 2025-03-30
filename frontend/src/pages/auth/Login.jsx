import React, { useState } from 'react';
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
  IconButton,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(loginStart());
      const response = await axios.post(`${config.apiBaseUrl}/auth/login`, values);
      dispatch(loginSuccess(response.data));
      
      // Use role-based dashboard routing instead of hardcoded '/dashboard'
      const userRole = response.data.user.role;
      let dashboardRoute = '/dashboard';
      
      // Determine the correct dashboard based on user role
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
          dashboardRoute = '/dashboard/business'; // Default fallback
      }
      
      navigate(dashboardRoute);
    } catch (err) {
      dispatch(loginFailure(err.response?.data?.message || 'Login failed'));
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
      {/* Left side - Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '45%' },
          p: { xs: 2, sm: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Box sx={{ maxWidth: '400px', mx: 'auto', width: '100%' }}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: '#2E7D32'
            }}
          >
            Log in to your account
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Don't have an account? <Link to="/register" style={{ color: '#2E7D32', textDecoration: 'none' }}>Sign Up</Link>
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  margin="normal"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Don't have an account?{' '}
                    <Link
                      to="/register"
                      style={{ color: '#2E7D32', textDecoration: 'none' }}
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>

      {/* Right side - Dynamic Background */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '55%',
          position: 'relative',
          bgcolor: '#001F2D',
          overflow: 'hidden'
        }}
      >
        {/* Content Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0, 31, 45, 0.85), rgba(46, 125, 50, 0.8))',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 6,
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontWeight: 700,
              mb: 3,
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              animation: 'fadeInUp 0.8s ease-out'
            }}
          >
            Food Waste Reduction Network
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              textAlign: 'center',
              maxWidth: '600px',
              animation: 'fadeInUp 1s ease-out',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
            }}
          >
            Join our mission to reduce food waste and feed communities in need. Together, we can make a difference.
          </Typography>

          {/* Stats Section */}
          <Box sx={{ mt: 6, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ textAlign: 'center', animation: 'fadeInUp 1s ease-out 0.3s' }}>
              <Typography variant="h4" sx={{ color: '#4CAF50', mb: 1 }}>
                1.3B
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff' }}>
                Tonnes of food wasted annually
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', animation: 'fadeInUp 1s ease-out 0.6s' }}>
              <Typography variant="h4" sx={{ color: '#4CAF50', mb: 1 }}>
                820M
              </Typography>
              <Typography variant="body1" sx={{ color: '#fff' }}>
                People face hunger daily
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Background Image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Food Donation"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.8) contrast(1.1)',
              transform: 'scale(1.02)',
              transition: 'transform 0.3s'
            }}
          />
        </Box>

        {/* Background Video */}
        <Box
          component="video"
          autoPlay
          muted
          loop
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 1,
            filter: 'brightness(0.7) saturate(1.2)',
          }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-of-people-sharing-food-at-a-table-4679-large.mp4" type="video/mp4" />
        </Box>

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,31,45,0.4) 100%)',
            zIndex: 3,
            pointerEvents: 'none',
            animation: 'pulse 4s infinite'
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;