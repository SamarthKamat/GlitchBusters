const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Food = require('../models/Food');
const User = require('../models/User');
const protect = require('../middleware/auth'); // Authentication middleware

// Get socket.io instance
const getIo = (req) => {
  const io = req.app.get('io');
  if (!io) {
    console.warn('Socket.io instance not found');
    return null;
  }
  return io;
}

// Create a new food listing
router.post('/', protect, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'business') {
      return res.status(403).json({ message: 'Only businesses can create food listings' });
    }
    console.log(req.body);
    const { location, expiryDate, pickupTime, safetyInfo, notes, ...rest } = req.body;

    // Validate required fields
    if (!location || !location.lat || !location.lng) {
      return res.status(400).json({ message: 'Valid location coordinates are required' });
    }

    // Create food listing with all fields from the frontend
    const foodListing = new Food({
      ...rest,
      location: {
        lat: location.lat,
        lng: location.lng
      },
      expiryDate: new Date(expiryDate),
      pickupDetails: {
        availableTime: {
          start: new Date(pickupTime),
          end: new Date(pickupTime)
        }
      },
      safetyChecklist: {
        temperatureChecked: false,
        packagingIntact: false,
        labelingComplete: false,
        transportationSafe: false
      },
      donor: req.user.id,
      status: 'available'
    });

    if (safetyInfo) {
      foodListing.safetyChecklist = {
        ...foodListing.safetyChecklist,
        notes: safetyInfo
      };
    }

    await foodListing.save();
    
    const io = getIo(req);
    if (io) {
      io.emit('newFoodListing', foodListing);
    }

    res.status(201).json(foodListing);
  } catch (error) {
    console.error('Food creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all available food listings
router.get('/', protect, async (req, res) => {
  try {
    const filters = { status: 'available' };

    if (req.query.category) filters.category = req.query.category;
    if (req.query.dietary) filters.dietaryInfo = req.query.dietary;

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

    if (!foodListing) return res.status(404).json({ message: 'Food listing not found' });

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

    if (!foodListing) return res.status(404).json({ message: 'Food listing not found' });

    if (foodListing.status !== 'available') {
      return res.status(400).json({ message: 'Food listing is not available' });
    }

    foodListing.status = 'claimed';
    foodListing.claimedBy = req.user.id;
    await foodListing.save();

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

    if (!foodListing) return res.status(404).json({ message: 'Food listing not found' });

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
      { $match: { status: 'delivered' } },
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
          totalDonations: { $sum: 1 },
          categories: { $addToSet: '$category' }
        }
      }
    ]);

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyStats = await Food.aggregate([
      {
        $match: {
          status: 'delivered',
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          quantity: { $sum: '$quantity' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.json({
      overall: stats[0] || { totalQuantity: 0, totalDonations: 0, categories: [] },
      monthly: monthlyStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get listings by donor
router.get('/my-listings', protect, async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'business') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const foodListings = await Food.find({ donor: req.user.id })
      .populate('claimedBy', 'name organization')
      .populate('volunteer', 'name')
      .sort({ createdAt: -1 });

    res.json(foodListings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a food listing
router.put('/:id', protect, async (req, res) => {
  try {
    const { location, ...rest } = req.body;

    const foodListing = await Food.findById(req.params.id);

    if (!foodListing) {
      return res.status(404).json({ message: 'Food listing not found' });
    }

    if (foodListing.donor.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this listing' });
    }

    if (foodListing.status !== 'available') {
      return res.status(400).json({ message: 'Cannot update claimed or delivered listings' });
    }

    if (location && (!location.lat || !location.lng)) {
      return res.status(400).json({ message: 'Invalid location data' });
    }

    const updatedListing = await Food.findByIdAndUpdate(
      req.params.id,
      { ...rest, ...(location && { location }) },
      { new: true }
    );

    res.json(updatedListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
