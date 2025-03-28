const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:5173']
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Explicitly allow frontend origin
  credentials: true,  // Allow credentials (cookies, auth headers)
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'glitchbusters'  // specify your database name
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB Connection Error:', err);
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Real-time food listing updates
  socket.on('newFoodListing', (data) => {
    io.emit('foodListingUpdate', data);
  });
});

// Make io instance available to routes
app.set('io', io);

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/food', require('./routes/food'));
app.use('/api/search', require('./routes/search/search'));
app.use('/api/recommendations', require('./routes/recommendation/recommendations'));


// API Routes for Charity Requests
app.use('/api/charity_request', require('./routes/charity_request/create_request'));
app.use('/api/charity_request', require('./routes/charity_request/get_requests'));
app.use('/api/charity_request', require('./routes/charity_request/donate'));
app.use('/api/charity_request', require('./routes/charity_request/change_requests'));
app.use('/api/charity_request', require('./routes/charity_request/history_and_claimed'));



// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});