const config = {
  apiBaseUrl: process.env.NODE_ENV === 'production'
    ? 'https://glitchbusters-backend.onrender.com/api'
    : 'http://localhost:5000/api',
  socketUrl: process.env.NODE_ENV === 'production'
    ? 'https://glitchbusters-backend.onrender.com'
    : 'http://localhost:5000'
};

export default config;