const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the food listing'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  quantity: {
    type: Number,
    required: [true, 'Please specify the quantity']
  },
  unit: {
    type: String,
    required: [true, 'Please specify the unit of measurement'],
    enum: ['kg', 'lbs', 'pieces', 'servings', 'boxes']
  },
  expiryDate: {
    type: Date,
    required: [true, 'Please specify the expiry date']
  },
  category: {
    type: String,
    required: [true, 'Please specify the food category'],
    enum: ['produce', 'dairy', 'bakery', 'meat', 'prepared', 'pantry', 'other']
  },
  temperature: {
    type: String,
    enum: ['room', 'refrigerated', 'frozen'],
    required: [true, 'Please specify storage temperature']
  },
  allergens: [{
    type: String,
    enum: ['dairy', 'eggs', 'fish', 'shellfish', 'tree-nuts', 'peanuts', 'wheat', 'soy']
  }],
  dietaryInfo: [{
    type: String,
    enum: ['vegetarian', 'vegan', 'halal', 'kosher', 'gluten-free']
  }],
  donor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Food listing must belong to a business']
  },
  status: {
    type: String,
    enum: ['available', 'claimed', 'picked-up', 'delivered', 'expired'],
    default: 'available'
  },
  claimedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  pickupDetails: {
    address: String,
    instructions: String,
    availableTime: {
      start: Date,
      end: Date
    },
    contact: {
      name: String,
      phone: String,
      email: String
    }
  },
  volunteer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  safetyChecklist: {
    temperatureChecked: Boolean,
    packagingIntact: Boolean,
    labelingComplete: Boolean,
    transportationSafe: Boolean
  },
  photos: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamps on save
foodSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for faster queries
foodSchema.index({ status: 1, expiryDate: 1 });
foodSchema.index({ donor: 1, createdAt: -1 });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;