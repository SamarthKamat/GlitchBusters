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
    organization: Yup.object().when('role', {
      is: (role) => role !== 'volunteer',
      then: Yup.object({
        name: Yup.string().required('Organization name is required'),
        address: Yup.string().required('Organization address is required'),
        phone: Yup.string().required('Organization phone is required')
      })
    })
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch(registerStart());
      const { confirmPassword, ...registerData } = values;
      const response = await axios.post('/api/auth/register', registerData);
      dispatch(registerSuccess(response.data));
      navigate('/dashboard');
    } catch (err) {
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
        alignItems: 'center',
        background: 'linear-gradient(45deg, #2E7D32 30%, #1B5E20 90%)'
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            gutterBottom
            sx={{ color: 'primary.main', fontWeight: 'bold' }}
          >
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Join the Food Waste Reduction Network
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              role: '',
              organization: {
                name: '',
                address: '',
                phone: '',
                website: '',
                description: ''
              }
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form style={{ width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="name"
                      name="name"
                      label="Full Name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="email"
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      id="confirmPassword"
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="role"
                      name="role"
                      select
                      label="Role"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.role && Boolean(errors.role)}
                      helperText={touched.role && errors.role}
                      variant="outlined"
                    >
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="charity">Charity</MenuItem>
                      <MenuItem value="volunteer">Volunteer</MenuItem>
                    </TextField>
                  </Grid>

                  {values.role && values.role !== 'volunteer' && (
                    <>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="organization.name"
                          name="organization.name"
                          label="Organization Name"
                          value={values.organization.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.organization?.name &&
                            Boolean(errors.organization?.name)
                          }
                          helperText={
                            touched.organization?.name && errors.organization?.name
                          }
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="organization.address"
                          name="organization.address"
                          label="Organization Address"
                          value={values.organization.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.organization?.address &&
                            Boolean(errors.organization?.address)
                          }
                          helperText={
                            touched.organization?.address &&
                            errors.organization?.address
                          }
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="organization.phone"
                          name="organization.phone"
                          label="Organization Phone"
                          value={values.organization.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.organization?.phone &&
                            Boolean(errors.organization?.phone)
                          }
                          helperText={
                            touched.organization?.phone && errors.organization?.phone
                          }
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="organization.website"
                          name="organization.website"
                          label="Organization Website (Optional)"
                          value={values.organization.website}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="organization.description"
                          name="organization.description"
                          label="Organization Description (Optional)"
                          value={values.organization.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </Grid>
                    </>
                  )}
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading || isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                </Button>

                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      style={{ color: '#2E7D32', textDecoration: 'none' }}
                    >
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;