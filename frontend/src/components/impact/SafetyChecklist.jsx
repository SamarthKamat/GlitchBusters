import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Divider,
  Tabs,
  Tab,
  Button,
  Alert
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const SafetyChecklist = () => {
  const [tabValue, setTabValue] = useState(0);
  const [businessChecklist, setBusinessChecklist] = useState({
    temperature: false,
    packaging: false,
    labeling: false,
    transportation: false,
    documentation: false,
    quality: false
  });
  const [charityChecklist, setCharityChecklist] = useState({
    inspection: false,
    storage: false,
    handling: false,
    distribution: false,
    recordKeeping: false,
    training: false
  });
  const [showComplianceAlert, setShowComplianceAlert] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBusinessChecklistChange = (item) => {
    setBusinessChecklist({
      ...businessChecklist,
      [item]: !businessChecklist[item]
    });
  };

  const handleCharityChecklistChange = (item) => {
    setCharityChecklist({
      ...charityChecklist,
      [item]: !charityChecklist[item]
    });
  };

  const handleVerifyCompliance = () => {
    const currentChecklist = tabValue === 0 ? businessChecklist : charityChecklist;
    const allChecked = Object.values(currentChecklist).every(value => value);
    setShowComplianceAlert(true);
    
    // Auto-hide the alert after 5 seconds
    setTimeout(() => {
      setShowComplianceAlert(false);
    }, 5000);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Food Safety Compliance Checklist
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Use these checklists to ensure your organization is following best practices for food safety and regulatory compliance.
      </Typography>
      
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        sx={{ mb: 3 }}
      >
        <Tab label="For Businesses" />
        <Tab label="For Charities" />
      </Tabs>
      
      {tabValue === 0 && (
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.temperature}
                onChange={() => handleBusinessChecklistChange('temperature')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Temperature Control"
              secondary="Ensure all perishable foods are kept at safe temperatures (below 40°F or above 140°F) before donation."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.packaging}
                onChange={() => handleBusinessChecklistChange('packaging')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Proper Packaging"
              secondary="Use food-grade containers and ensure all packaging is intact and sealed to prevent contamination."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.labeling}
                onChange={() => handleBusinessChecklistChange('labeling')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Accurate Labeling"
              secondary="Include product name, ingredients, allergens, use-by dates, and handling instructions on all donated items."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.transportation}
                onChange={() => handleBusinessChecklistChange('transportation')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Transportation Standards"
              secondary="Ensure vehicles used for food transport are clean and maintained to prevent contamination."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.documentation}
                onChange={() => handleBusinessChecklistChange('documentation')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Documentation"
              secondary="Maintain records of all food donations including quantities, dates, and recipients for at least one year."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={businessChecklist.quality}
                onChange={() => handleBusinessChecklistChange('quality')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Quality Assurance"
              secondary="Only donate food that meets quality standards and would be suitable for sale or consumption."
            />
          </ListItem>
        </List>
      )}
      
      {tabValue === 1 && (
        <List>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.inspection}
                onChange={() => handleCharityChecklistChange('inspection')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Incoming Inspection"
              secondary="Inspect all incoming food donations for quality, safety, and proper labeling before acceptance."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.storage}
                onChange={() => handleCharityChecklistChange('storage')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Proper Storage"
              secondary="Store all food items at appropriate temperatures and follow first-in, first-out inventory management."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.handling}
                onChange={() => handleCharityChecklistChange('handling')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Safe Handling"
              secondary="Ensure staff and volunteers follow proper hand washing and food handling procedures."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.distribution}
                onChange={() => handleCharityChecklistChange('distribution')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Distribution Protocols"
              secondary="Implement procedures to ensure food is distributed before expiration and maintains safety throughout."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.recordKeeping}
                onChange={() => handleCharityChecklistChange('recordKeeping')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Record Keeping"
              secondary="Maintain detailed records of all received donations, storage conditions, and distribution."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={charityChecklist.training}
                onChange={() => handleCharityChecklistChange('training')}
              />
            </ListItemIcon>
            <ListItemText
              primary="Staff Training"
              secondary="Ensure all staff and volunteers are trained in food safety procedures and regulatory requirements."
            />
          </ListItem>
        </List>
      )}
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<CheckCircleIcon />}
          onClick={handleVerifyCompliance}
        >
          Verify Compliance
        </Button>
      </Box>
      
      {showComplianceAlert && (
        <Alert 
          severity={Object.values(tabValue === 0 ? businessChecklist : charityChecklist).every(value => value) ? "success" : "warning"}
          sx={{ mt: 3 }}
          icon={Object.values(tabValue === 0 ? businessChecklist : charityChecklist).every(value => value) ? <CheckCircleIcon /> : <WarningIcon />}
        >
          {Object.values(tabValue === 0 ? businessChecklist : charityChecklist).every(value => value) 
            ? "Great job! Your organization is following all recommended safety guidelines." 
            : "Some safety guidelines are not being followed. Please review the unchecked items to ensure full compliance."}
        </Alert>
      )}
    </Paper>
  );
};

export default SafetyChecklist;