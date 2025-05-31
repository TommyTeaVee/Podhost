// Report a comment (by any user)
exports.reportComment = async (req, res) => {
  const { commentId } = req.params;

  const comment = await prisma.comment.update({
    where: { id: commentId },
    data: { reported: true },
  });

  res.json({ message: 'Comment reported', comment });
};

// Delete a comment (admin only)
exports.deleteComment = async (req, res) => {
  const { commentId } = req.params;

  await prisma.comment.delete({ where: { id: commentId } });
  res.json({ message: 'Comment deleted' });
};

const prisma = require('../utils/prisma');

exports.createComment = async (req, res) => {
  const { content, podcastId } = req.body;

  const podcast = await prisma.podcast.findUnique({ where: { id: podcastId } });
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

  const comment = await prisma.comment.create({
    data: {
      content,
      podcastId,
      userId: req.user.id,
    },
    include: {
      user: {
        select: { id: true, email: true },
      },
    },
  });

  res.status(201).json(comment);
};

exports.getComments = async (req, res) => {
  const { podcastId } = req.params;

  const comments = await prisma.comment.findMany({
    where: { podcastId },
    include: {
      user: {
        select: { id: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  res.json(comments);
};
