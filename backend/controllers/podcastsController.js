const prisma = require('../utils/prisma');

exports.createPodcast = async (req, res) => {
  const { title, description } = req.body;
  const podcast = await prisma.podcast.create({
    data: {
      title,
      description,
      userId: req.user.id,
    },
  });
  res.status(201).json(podcast);
};

exports.getMyPodcasts = async (req, res) => {
  const podcasts = await prisma.podcast.findMany({
    where: { userId: req.user.id },
    include: { episodes: true, donations: true, comments: true },
  });
  res.json(podcasts);
};

exports.reportPodcast = async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.podcast.update({
    where: { id },
    data: { reported: true },
  });

  res.json({ message: 'Podcast reported', podcast: updated });
};

exports.deletePodcast = async (req, res) => {
  const { id } = req.params;

  await prisma.episode.deleteMany({ where: { podcastId: id } });
  await prisma.comment.deleteMany({ where: { podcastId: id } });
  await prisma.donation.deleteMany({ where: { podcastId: id } });
  await prisma.podcast.delete({ where: { id } });

  res.json({ message: 'Podcast deleted' });
};

