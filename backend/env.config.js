// Environment Configuration
// In production, use actual environment variables
// For development, these are the default values

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/payment-app",
    JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-here-make-it-long-and-random-at-least-32-characters",
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || "development"
};
