import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Divider,
  Button,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  FoodBank as FoodIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { markAlertAsRead, removeAlert, clearAllAlerts } from '../../store/slices/alertSlice';

const RealTimeAlerts = () => {
  const dispatch = useDispatch();
  const { alerts, notificationCount } = useSelector((state) => state.alert);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMarkAsRead = (id) => {
    dispatch(markAlertAsRead(id));
  };

  const handleRemoveAlert = (id) => {
    dispatch(removeAlert(id));
  };

  const handleClearAll = () => {
    dispatch(clearAllAlerts());
    handleClose();
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'food':
        return <FoodIcon color="primary" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'success':
        return <CheckCircleIcon color="success" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'notifications-popover' : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        color="inherit"
        size="large"
      >
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notifications</Typography>
          {alerts.length > 0 && (
            <Button size="small" onClick={handleClearAll}>Clear All</Button>
          )}
        </Box>
        <Divider />
        {alerts.length === 0 ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications at this time
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {alerts.map((alert) => (
              <React.Fragment key={alert.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveAlert(alert.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  }
                  sx={{
                    bgcolor: alert.read ? 'transparent' : 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                  onClick={() => !alert.read && handleMarkAsRead(alert.id)}
                >
                  <ListItemIcon>
                    {getAlertIcon(alert.type)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2">{alert.title}</Typography>
                        {!alert.read && (
                          <Chip label="New" size="small" color="primary" sx={{ height: 20 }} />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.primary" sx={{ mt: 0.5 }}>
                          {alert.message}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                          {new Date(alert.timestamp).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
      </Popover>
    </>
  );
};

export default RealTimeAlerts;