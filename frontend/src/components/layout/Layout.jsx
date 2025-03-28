import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Restaurant as RestaurantIcon,
  Favorite as CharityIcon,
  DirectionsBike as VolunteerIcon,
  Assessment as ImpactIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { logout } from '../../store/slices/authSlice';
import ThemeToggle from './ThemeToggle';
import { useThemeContext } from '../../theme/ThemeContext';
import { Explore as ExploreIcon } from '@mui/icons-material';
import { Client } from "@gradio/client";
import {
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { Chat as ChatIcon } from '@mui/icons-material';

const drawerWidth = 280;

// First, move the client initialization inside the component and add new state
const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const [gradioResult, setGradioResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  // Function to fetch food listings alerts
  const fetchFoodListings = async () => {
    try {
      setIsLoading(true);
      const client = await Client.connect("https://e26c0a78286954790a.gradio.live/");
      const result = await client.predict("/view_listings_interface", {});
      const listings = result?.data ? JSON.parse(result.data) : [];
      setGradioResult(listings);
      // Update notification count
      dispatch(setNotificationCount(listings.length));
    } catch (error) {
      console.error('Error fetching food listings:', error);
      setGradioResult([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle notification menu open
  const handleNotificationOpen = async (event) => {
    setNotificationAnchor(event.currentTarget);
    await fetchFoodListings();
  };

  // Fetch food listings periodically
  useEffect(() => {
    fetchFoodListings();
    const interval = setInterval(fetchFoodListings, 60000); // Fetch every minute
    return () => clearInterval(interval);
  }, []);
  const { user } = useSelector((state) => state.auth);
  const { notificationCount, alerts } = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { mode } = useThemeContext();
  




  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleChatOpen = () => {
    setChatOpen(true);
  };

  const handleChatClose = () => {
    setChatOpen(false);
    setChatMessage('');
    setChatResponse('');
  };

  const handleChatSubmit = async () => {
    try {
      setIsLoading(true);
      const client = await Client.connect("https://e2763c87228d3ac3c3.gradio.live/");
      const result = await client.predict("/chat", { 
        message: chatMessage 
      });
      setChatResponse(result.data);
    } catch (error) {
      console.error('Error sending chat message:', error);
      setChatResponse('Sorry, there was an error processing your message.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // In the getMenuItems function, add Food Requests for charity users
  const getMenuItems = () => {
      const baseItems = [
        {
          text: 'Explore',
          icon: <ExploreIcon />,
          path: '/explore'
        },
        {
          text: 'Profile',
          icon: <ProfileIcon />,
          path: '/profile'
        },
        {
          text: 'Settings',
          icon: <SettingsIcon />,
          path: '/settings'
        }
      ];
  
      // Add Food Listings only for business users
      if (user?.role === 'business') {
        baseItems.splice(1, 0, {
          text: 'Food Listings',
          icon: <RestaurantIcon />,
          path: '/food-listings'
        });
      }
  
      // Add Food Requests only for charity users
      if (user?.role === 'charity') {
        baseItems.splice(1, 0, {
          text: 'Food Requests',
          icon: <CharityIcon />,
          path: '/food-requests'
        });
      }
  
      const roleSpecificItems = {
        business: [
          {
            text: 'Business Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard/business'
          }
        ],
        charity: [
          {
            text: 'Charity Dashboard',
            icon: <CharityIcon />,
            path: '/dashboard/charity'
          }
        ],
        volunteer: [
          {
            text: 'Volunteer Dashboard',
            icon: <VolunteerIcon />,
            path: '/dashboard/volunteer'
          }
        ],
        admin: [
          {
            text: 'Admin Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard/admin'
          }
        ]
      };
  
      return [...(roleSpecificItems[user?.role] || []), ...baseItems];
    };

    const drawer = (
      <div>
        <Toolbar sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          py: 2
        }}>
          <Avatar
            sx={{ 
              width: 64, 
              height: 64, 
              mb: 1,
              bgcolor: 'primary.main',
              boxShadow: mode === 'dark' ? '0 0 8px rgba(255, 255, 255, 0.2)' : 'none'
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.organization?.name}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {getMenuItems().map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: '8px',
                  mx: 1,
                  my: 0.5,
                  '&.Mui-selected': {
                    bgcolor: mode === 'dark' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(46, 125, 50, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: location.pathname === item.path ? 600 : 400 
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            color: 'text.primary',
            boxShadow: 1
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Food Waste Reduction Network
            </Typography>
            <ThemeToggle />
            <IconButton color="inherit" onClick={handleNotificationOpen} sx={{ mx: 1 }}>
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit" onClick={handleChatOpen} sx={{ mx: 1 }}>
              <ChatIcon />
            </IconButton>
            <IconButton
              onClick={handleProfileMenuOpen}
              sx={{ ml: 1 }}
            >
              <Avatar 
                sx={{ 
                  width: 32, 
                  height: 32, 
                  bgcolor: 'primary.main',
                  boxShadow: mode === 'dark' ? '0 0 4px rgba(255, 255, 255, 0.2)' : 'none'
                }}
              >
                {user?.name?.charAt(0)?.toUpperCase()}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth 
              }
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth 
              }
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            minHeight: '100vh',
            bgcolor: 'background.default',
            transition: 'all 0.3s ease'
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          onClick={handleProfileMenuClose}
        >
          <MenuItem onClick={() => navigate('/profile')}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={() => navigate('/settings')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          onClick={handleNotificationClose}
          PaperProps={{
            sx: { width: 360 }
          }}
        >
          {isLoading ? (
            <MenuItem>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              <Typography variant="body2">Loading food listings...</Typography>
            </MenuItem>
          ) : gradioResult && Array.isArray(gradioResult) ? (
            <>
              {gradioResult.map((listing, index) => (
                <MenuItem key={index} onClick={() => navigate(`/food-listings/${listing.id}`)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {listing.source}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {listing.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                      <Typography variant="caption" color="primary">
                        Qty: {listing.quantity}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {listing.pickup}
                      </Typography>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
              {gradioResult.length === 0 && (
                <MenuItem>
                  <Typography variant="body2" color="text.secondary">
                    No new food listings available
                  </Typography>
                </MenuItem>
              )}
            </>
          ) : (
            <MenuItem>
              <Typography variant="body2" color="text.secondary">
                No new notifications
              </Typography>
            </MenuItem>
          )}
        </Menu>

        {/* Chat Dialog */}
        <Dialog
          open={chatOpen}
          onClose={handleChatClose}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Chat with AI Assistant</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Type your message"
              type="text"
              fullWidth
              multiline
              rows={3}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              variant="outlined"
              sx={{ mb: 2 }}
            />
            {chatResponse && (
              <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                <Typography variant="body1">{chatResponse}</Typography>
              </Box>
            )}
            {isLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <CircularProgress />
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleChatClose}>Cancel</Button>
            <Button onClick={handleChatSubmit} variant="contained" disabled={!chatMessage || isLoading}>
              Send
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
};

export default Layout;