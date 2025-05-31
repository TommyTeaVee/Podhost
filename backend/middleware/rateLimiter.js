const rateLimit = require('express-rate-limit');

// Limit to 5 reports per 10 minutes per IP
exports.reportLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: 'Too many reports sent. Please try again later.',
});