
const env = require('./env.config');

const JWT_SECRET = env.JWT_SECRET;
const MONGODB_URI = env.MONGODB_URI;
const PORT = env.PORT;

module.exports = { JWT_SECRET, MONGODB_URI, PORT };