const prisma = require('../utils/prisma');

exports.createEpisode = async (req, res) => {
  const { title, audioUrl, podcastId } = req.body;

  const podcast = await prisma.podcast.findUnique({ where: { id: podcastId } });
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

  const episode = await prisma.episode.create({
    data: {
      title,
      audioUrl,
      podcastId,
    },
  });

  res.status(201).json(episode);
};

exports.getEpisodes = async (req, res) => {
  const { podcastId } = req.params;

  const episodes = await prisma.episode.findMany({
    where: { podcastId },
    orderBy: { createdAt: 'desc' },
  });

  res.json(episodes);
};
exports.reportEpisode = async (req, res) => {
  const { id } = req.params;

  const updated = await prisma.episode.update({
    where: { id },
    data: { reported: true },
  });

  res.json({ message: 'Episode reported', episode: updated });
};

exports.deleteEpisode = async (req, res) => {
  const { id } = req.params;

  await prisma.episode.delete({ where: { id } });

  res.json({ message: 'Episode deleted' });
};

