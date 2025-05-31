const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { donate } = require('../controllers/donationsController');

router.post('/', protect, donate);

module.exports = router;
