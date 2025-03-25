const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const User = require('../models/User');

// Middleware to protect routes (imported from auth.js)
const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized to access this route' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Create a new food listing
router.post('/', protect, async (req, res) => {
  try {
    if (req.user.role !== 'business') {
      return res.status(403).json({ message: 'Only businesses can create food listings' });
    }

    const foodListing = new Food({
      ...req.body,
      donor: req.user.id
    });

    await foodListing.save();

    // Emit socket event for real-time updates
    req.app.get('io').emit('newFoodListing', foodListing);

    res.status(201).json(foodListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all available food listings
router.get('/', protect, async (req, res) => {
  try {
    const filters = { status: 'available' };

    // Add category filter if provided
    if (req.query.category) {
      filters.category = req.query.category;
    }

    // Add dietary filter if provided
    if (req.query.dietary) {
      filters.dietaryInfo = req.query.dietary;
    }

    const foodListings = await Food.find(filters)
      .populate('donor', 'name organization')
      .sort({ expiryDate: 1 });

    res.json(foodListings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get food listing by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const foodListing = await Food.findById(req.params.id)
      .populate('donor', 'name organization')
      .populate('claimedBy', 'name organization')
      .populate('volunteer', 'name');

    if (!foodListing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    res.json(foodListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Claim a food listing
router.post('/:id/claim', protect, async (req, res) => {
  try {
    if (req.user.role !== 'charity') {
      return res.status(403).json({ message: 'Only charities can claim food listings' });
    }

    const foodListing = await Food.findById(req.params.id);

    if (!foodListing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    if (foodListing.status !== 'available') {
      return res.status(400).json({ message: 'Food listing is not available' });
    }

    foodListing.status = 'claimed';
    foodListing.claimedBy = req.user.id;
    await foodListing.save();

    // Emit socket event for real-time updates
    req.app.get('io').emit('foodListingUpdate', foodListing);

    res.json(foodListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update food listing status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const foodListing = await Food.findById(req.params.id);

    if (!foodListing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    // Validate status transitions
    const validTransitions = {
      available: ['claimed', 'expired'],
      claimed: ['picked-up', 'expired'],
      'picked-up': ['delivered', 'expired'],
      delivered: ['expired'],
      expired: []
    };

    if (!validTransitions[foodListing.status].includes(status)) {
      return res.status(400).json({ message: 'Invalid status transition' });
    }

    foodListing.status = status;
    if (status === 'picked-up' && req.user.role === 'volunteer') {
      foodListing.volunteer = req.user.id;
    }

    await foodListing.save();

    // Emit socket event for real-time updates
    req.app.get('io').emit('foodListingUpdate', foodListing);

    res.json(foodListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get statistics for impact dashboard
router.get('/stats/impact', protect, async (req, res) => {
  try {
    const stats = await Food.aggregate([
      {
        $match: {
          status: 'delivered'
        }
      },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
          totalDonations: { $sum: 1 },
          categories: { $addToSet: '$category' }
        }
      }
    ]);

    const monthlyStats = await Food.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 12))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          quantity: { $sum: '$quantity' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      overall: stats[0] || { totalQuantity: 0, totalDonations: 0, categories: [] },
      monthly: monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;