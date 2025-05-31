const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { createPodcast, getMyPodcasts, reportPodcast } = require('../controllers/podcastsController');
const { reportLimiter } = require('../middleware/rateLimiter');
router.post('/', protect, createPodcast);
router.get('/', protect, getMyPodcasts);
router.post('/:id/report', protect, reportLimiter, reportPodcast);


module.exports = router;
