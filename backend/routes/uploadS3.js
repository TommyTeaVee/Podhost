import express from 'express';
import { getPresignedUrl } from '../controllers/uploadController.js';
import { authenticateJWT } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/presigned-url', authenticateJWT, getPresignedUrl);

export default router;
