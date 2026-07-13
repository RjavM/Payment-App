// Environment Configuration
// Load environment variables from .env file
require('dotenv').config();

// Validate required environment variables
const requiredEnvVars = ['JWT_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars.join(', '));
    console.error('Please create a .env file with the required variables.');
    process.exit(1);
}

// Generate a warning for weak JWT secret in production
if (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET === 'your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters') {
    console.warn('WARNING: Using default JWT secret in production! Please set a strong JWT_SECRET in your environment variables.');
}

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/payment-app",
    JWT_SECRET: process.env.JWT_SECRET,
    PORT: parseInt(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173"
};
