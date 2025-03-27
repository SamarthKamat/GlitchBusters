import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
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

const drawerWidth = 280;

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  
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

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // In the getMenuItems function, add the Explore item:
  const getMenuItems = () => {
      const baseItems = [
        {
          text: 'Explore',
          icon: <ExploreIcon />,
          path: '/explore'
        },
        {
          text: 'Food Listings',
          icon: <RestaurantIcon />,
          path: '/food-listings'
        },
      // Removed Impact Dashboard menu item
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
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <MenuItem key={alert.id}>
              <Typography variant="body2">{alert.message}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            <Typography variant="body2" color="text.secondary">
              No new notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default Layout;