const express = require('express');
const router = express.Router();
const Food = require('../../models/Food');
const CharityRequest = require('../../models/CharityRequest');
const protect = require('../../middleware/auth');

// Get personalized recommendations based on user role
router.get('/', protect, async (req, res) => {
  try {
    if (req.user.role === 'business') {
      // For businesses, find relevant charity requests
      const recommendations = await CharityRequest.find({
        status: { $in: ['pending', 'partially_fulfilled'] },
        category: { $in: req.user.preferredCategories || ['produce', 'dairy', 'bakery', 'meat', 'prepared', 'pantry'] }
      })
      .populate('charity', 'name organization')
      .sort({ createdAt: -1 })
      .limit(10);

      res.json(recommendations);
    } 
    else if (req.user.role === 'charity') {
      // For charities, find available food donations
      const recommendations = await Food.find({
        status: 'available',
        expiryDate: { $gt: new Date() },
        category: { $in: req.user.preferredCategories || ['produce', 'dairy', 'bakery', 'meat', 'prepared', 'pantry'] }
      })
      .populate('donor', 'name organization')
      .sort({ expiryDate: 1 })
      .limit(10);

      res.json(recommendations);
    } 
    else {
      res.status(400).json({ message: 'Recommendations not available for this user role' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;