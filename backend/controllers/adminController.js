const prisma = require('../utils/prisma');

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, role: true, createdAt: true },
  });
  res.json(users);
};

exports.deletePodcast = async (req, res) => {
  const { id } = req.params;

  const podcast = await prisma.podcast.findUnique({ where: { id } });
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

  await prisma.episode.deleteMany({ where: { podcastId: id } });
  await prisma.comment.deleteMany({ where: { podcastId: id } });
  await prisma.donation.deleteMany({ where: { podcastId: id } });
  await prisma.podcast.delete({ where: { id } });

  res.json({ message: 'Podcast and related data deleted.' });
};
