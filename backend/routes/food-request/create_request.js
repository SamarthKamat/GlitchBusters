const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const FoodRequest = require('../../models/FoodRequest');

// @route   POST /api/food-request/create_request
// @desc    Create a new food request
// @access  Private (Charity only)
router.post('/create_request', auth, async (req, res) => {
  try {
    const { title, description, category, quantityRequested, unit, location, status } = req.body;

    // Validate user role
    if (req.user.role !== 'charity') {
      return res.status(403).json({ message: 'Only charities can create food requests' });
    }

    // Create new food request
    const foodRequest = new FoodRequest({
      title,
      description,
      category,
      quantityRequested,
      quantityFulfilled: 0,
      unit,
      location,
      status,
      charity: req.user._id
    });

    await foodRequest.save();

    res.status(201).json(foodRequest);
  } catch (err) {
    console.error('Error creating food request:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;