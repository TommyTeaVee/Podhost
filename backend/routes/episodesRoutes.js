const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { createEpisode, getEpisodes, reportEpisode } = require('../controllers/episodesController');
const { reportLimiter } = require('../middleware/rateLimiter');
router.post('/', protect, createEpisode);
router.get('/:podcastId', protect, getEpisodes);
router.post('/:id/report', protect, reportLimiter, reportEpisode);

module.exports = router;
