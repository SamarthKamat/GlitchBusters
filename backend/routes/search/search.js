const express = require('express');
const router = express.Router();
const Food = require('../../models/Food');
const User = require('../../models/User');
const CharityRequest = require('../../models/CharityRequest');
const protect = require('../../middleware/auth');

// Global search across all entities
router.get('/', protect, async (req, res) => {
  try {
    const { query } = req.query;
    const searchRegex = new RegExp(query, 'i');

    // Search in Food Listings
    const foodListings = await Food.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ]
    }).populate('donor', 'name organization');

    // Search in Charity Requests
    const charityRequests = await CharityRequest.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex }
      ]
    }).populate('charity', 'name organization');

    // Search in Users/Organizations
    const users = await User.find({
      $or: [
        { name: searchRegex },
        { 'organization.name': searchRegex },
        { 'organization.description': searchRegex }
      ]
    }).select('-password');

    res.json({
      foodListings,
      charityRequests,
      organizations: users
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;