const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/adminMiddleware');
const {
  createComment,
  getComments,
  reportComment,
  deleteComment
} = require('../controllers/commentsController');

router.post('/', protect, createComment);
router.get('/:podcastId', getComments);

// Moderation routes
router.post('/:commentId/report', protect, reportComment);
router.delete('/:commentId', protect, isAdmin, deleteComment);

module.exports = router;
