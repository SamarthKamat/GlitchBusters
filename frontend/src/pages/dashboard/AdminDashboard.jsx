import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import {
  PeopleAlt as PeopleIcon,
  TrendingUp as TrendingUpIcon,
  Restaurant as RestaurantIcon,
  Favorite as FavoriteIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import '@mui/x-date-pickers/AdapterDateFns';
import {
  getFoodListingsStart,
  getFoodListingsSuccess,
  getFoodListingsFailure
} from '../../store/slices/foodSlice';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { foodListings, loading } = useSelector((state) => state.food);
  const [stats, setStats] = useState({
    totalUsers: 0,
    businessUsers: 0,
    charityUsers: 0,
    volunteerUsers: 0,
    totalFoodListings: 0,
    activeFoodListings: 0,
    completedDonations: 0
  });
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getFoodListingsStart());
        
        // Fetch food listings
        const foodResponse = await axios.get('/api/food', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        dispatch(getFoodListingsSuccess(foodResponse.data));
        
        // Fetch users (admin only)
        const usersResponse = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        
        // In a real app, this would be an actual API call
        // For now, we'll simulate the data
        const mockUsers = [
          { id: '1', name: 'John Business', email: 'john@business.com', role: 'business', status: 'active', createdAt: '2023-01-15T10:30:00Z' },
          { id: '2', name: 'Sarah Charity', email: 'sarah@charity.org', role: 'charity', status: 'active', createdAt: '2023-02-20T14:45:00Z' },
          { id: '3', name: 'Mike Volunteer', email: 'mike@volunteer.net', role: 'volunteer', status: 'active', createdAt: '2023-03-10T09:15:00Z' },
          { id: '4', name: 'Lisa Business', email: 'lisa@business.com', role: 'business', status: 'inactive', createdAt: '2023-01-25T11:20:00Z' },
          { id: '5', name: 'Tom Charity', email: 'tom@charity.org', role: 'charity', status: 'active', createdAt: '2023-02-28T16:30:00Z' },
          { id: '6', name: 'Emma Volunteer', email: 'emma@volunteer.net', role: 'volunteer', status: 'active', createdAt: '2023-03-15T10:45:00Z' },
        ];
        
        setUsers(mockUsers);
        
        // Calculate stats
        setStats({
          totalUsers: mockUsers.length,
          businessUsers: mockUsers.filter(user => user.role === 'business').length,
          charityUsers: mockUsers.filter(user => user.role === 'charity').length,
          volunteerUsers: mockUsers.filter(user => user.role === 'volunteer').length,
          totalFoodListings: foodResponse.data.length,
          activeFoodListings: foodResponse.data.filter(listing => listing.status === 'available').length,
          completedDonations: foodResponse.data.filter(listing => listing.status === 'delivered').length
        });
      } catch (error) {
        dispatch(getFoodListingsFailure(error.message));
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUserDetails({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setUserDialog(true);
  };

  const handleUpdateUser = async () => {
    try {
      // In a real app, this would be an API call to update the user
      const updatedUsers = users.map(u => 
        u.id === selectedUser.id ? { ...u, ...userDetails } : u
      );
      setUsers(updatedUsers);
      setUserDialog(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      // In a real app, this would be an API call to toggle user status
      const updatedUsers = users.map(u => 
        u.id === userId ? { ...u, status: currentStatus === 'active' ? 'inactive' : 'active' } : u
      );
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
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
          {value}
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
        Admin Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            icon={<PeopleIcon />}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Food Listings"
            value={stats.totalFoodListings}
            icon={<RestaurantIcon />}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Listings"
            value={stats.activeFoodListings}
            icon={<TrendingUpIcon />}
            color="info"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Completed Donations"
            value={stats.completedDonations}
            icon={<FavoriteIcon />}
            color="warning"
          />
        </Grid>
      </Grid>

      {/* User Management Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        User Management
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', mb: 4 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip 
                      label={user.role.charAt(0).toUpperCase() + user.role.slice(1)} 
                      color={
                        user.role === 'business' ? 'primary' : 
                        user.role === 'charity' ? 'success' : 'info'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status.toUpperCase()} 
                      color={user.status === 'active' ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{format(new Date(user.createdAt), 'PPP')}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <IconButton size="small" onClick={() => handleEditUser(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color={user.status === 'active' ? 'error' : 'success'}
                        onClick={() => handleToggleUserStatus(user.id, user.status)}
                      >
                        {user.status === 'active' ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* User Edit Dialog */}
      <Dialog open={userDialog} onClose={() => setUserDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            label="Role"
            fullWidth
            variant="outlined"
            value={userDetails.role}
            onChange={(e) => setUserDetails({ ...userDetails, role: e.target.value })}
            sx={{ mb: 2 }}
          >
            {['business', 'charity', 'volunteer'].map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </TextField>
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={userDetails.status}
            onChange={(e) => setUserDetails({ ...userDetails, status: e.target.value })}
          >
            {['active', 'inactive'].map((status) => (
              <option key={status} value={status}>
                {status.toUpperCase()}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUserDialog(false)}>Cancel</Button>
          <Button onClick={handleUpdateUser} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      {/* System Metrics Section */}
      <Typography variant="h5" sx={{ mb: 2, mt: 4 }}>
        User Distribution
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Business Users</Typography>
              <Typography variant="h3">{stats.businessUsers}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.businessUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Charity Users</Typography>
              <Typography variant="h3">{stats.charityUsers}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.charityUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Volunteer Users</Typography>
              <Typography variant="h3">{stats.volunteerUsers}</Typography>
              <Typography variant="body2" color="text.secondary">
                {((stats.volunteerUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;