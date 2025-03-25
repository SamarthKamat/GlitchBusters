import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, CssBaseline } from '@mui/material';

// Layout Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboard Pages
import BusinessDashboard from './pages/dashboard/BusinessDashboard';
import CharityDashboard from './pages/dashboard/CharityDashboard';
import VolunteerDashboard from './pages/dashboard/VolunteerDashboard';
import AdminDashboard from './pages/dashboard/AdminDashboard';

// Food Listing Pages
import FoodListings from './pages/food/FoodListings';
import FoodListingDetails from './pages/food/FoodListingDetails';
import CreateFoodListing from './pages/food/CreateFoodListing';

// Impact & Statistics Pages
import ImpactDashboard from './pages/impact/ImpactDashboard';

// Profile & Settings Pages
import Profile from './pages/profile/Profile';
import Settings from './pages/profile/Settings';

// Other Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const getDashboardRoute = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'business':
        return '/dashboard/business';
      case 'charity':
        return '/dashboard/charity';
      case 'volunteer':
        return '/dashboard/volunteer';
      case 'admin':
        return '/dashboard/admin';
      default:
        return '/login';
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardRoute()} />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={getDashboardRoute()} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {/* Dashboard Routes */}
          <Route path="/dashboard/business" element={<BusinessDashboard />} />
          <Route path="/dashboard/charity" element={<CharityDashboard />} />
          <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Food Listing Routes */}
          <Route path="/food-listings" element={<FoodListings />} />
          <Route path="/food-listings/:id" element={<FoodListingDetails />} />
          <Route path="/food-listings/create" element={<CreateFoodListing />} />

          {/* Impact & Statistics Routes */}
          <Route path="/impact" element={<ImpactDashboard />} />

          {/* Profile & Settings Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;