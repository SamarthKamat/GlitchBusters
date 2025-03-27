import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
import ImpactDashboard from './pages/dashboard/ImpactDashboard';

// Food Listing Pages
import FoodListings from './pages/food/FoodListings';
import FoodListingDetails from './pages/food/FoodListingDetails';
import CreateFoodListing from './pages/food/CreateFoodListing';

// Impact & Statistics Pages
// Removed Impact Dashboard import

// Profile & Settings Pages
import Profile from './pages/profile/Profile';
import Settings from './pages/profile/Settings';
import Explore from './pages/explore/Explore';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Initiatives from './pages/Initiatives';
import Donations from './pages/Donations';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import NotFound from './pages/NotFound';

// Add import at the top with other page imports

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
    <div className="flex min-h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to={getDashboardRoute()} />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to={getDashboardRoute()} />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          {/* Dashboard Routes */}
          <Route path="/dashboard/business" element={<BusinessDashboard />} />
          <Route path="/dashboard/charity" element={<CharityDashboard />} />
          <Route path="/dashboard/volunteer" element={<VolunteerDashboard />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />

          {/* Add this new route */}
          <Route path="/explore" element={<Explore />} />

          {/* Profile & Settings Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />

          {/* Food Listing Routes */}
          <Route path="/food-listings" element={<FoodListings />} />
          <Route path="/food-listings/:id" element={<FoodListingDetails />} />
          <Route path="/food-listings/create" element={<CreateFoodListing />} />

          {/* Impact & Statistics Routes */}
          <Route path="/dashboard/impact" element={
            <ProtectedRoute>
              <ImpactDashboard />
            </ProtectedRoute>
          } />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;