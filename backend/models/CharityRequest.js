const mongoose = require('mongoose');

const charityRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the request'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  category: {
    type: String,
    required: [true, 'Please specify the category'],
    enum: ['produce', 'dairy', 'bakery', 'meat', 'prepared', 'pantry', 'other']
  },
  quantityRequested: {
    type: Number,
    required: [true, 'Please specify the required quantity']
  },
  unit: {
    type: String,
    required: [true, 'Please specify the unit'],
    enum: ['kg', 'lbs', 'pieces', 'servings', 'boxes']
  },
  quantityFulfilled: {
    type: Number,
    default: 0 // Track how much has been donated
  },
  status: {
    type: String,
    enum: ['pending', 'partially_fulfilled', 'fulfilled'],
    default: 'pending'
  },
  charity: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Request must be made by a charity']
  },
  donations: [
    {
      donor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      quantity: Number,
      donatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

charityRequestSchema.pre('save', function (next) {
  if (this.quantityFulfilled >= this.quantityRequested) {
    this.status = 'fulfilled';
  } else if (this.quantityFulfilled > 0) {
    this.status = 'partially_fulfilled';
  } else {
    this.status = 'pending';
  }
  this.updatedAt = Date.now();
  next();
});

const CharityRequest = mongoose.model('CharityRequest', charityRequestSchema);
module.exports = CharityRequest;
