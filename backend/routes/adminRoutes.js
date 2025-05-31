const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const { getUsers } = require('../controllers/adminController');
const { reportEpisode , deleteEpisode} = require('../controllers/episodesController');
const {deletePodcast, reportPodcast}= require('../controllers/podcastsController')

router.get('/users', protect, isAdmin, getUsers);
router.delete('/podcasts/:id', protect, isAdmin, deletePodcast);
// Reported items for moderation
router.get('/reported/podcasts', protect, isAdmin, reportPodcast);

router.get('/reported/episodes', protect, isAdmin, reportEpisode);

// Delete endpoints
router.delete('/episodes/:id', protect, isAdmin, deleteEpisode);
router.delete('/podcasts/:id', protect, isAdmin, deletePodcast);

module.exports = router;
