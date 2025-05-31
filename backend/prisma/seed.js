const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding...');

  const passwordHash = await bcrypt.hash('password123', 10);

  // USERS
  const bob = await prisma.user.create({
    data: {
      username: 'bob',
      email: 'bob@impilomag.co.za',
      password: passwordHash,
      fullname: 'Bob Johnson',
      lastname: 'Johnson',
    },
  });

  const alice = await prisma.user.create({
    data: {
      username: 'alice',
      email: 'alice@mail.com',
      password: passwordHash,
      fullname: 'Alice Peterson',
      lastname: 'Peterson',
    },
  });

  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@impilomag.co.za',
      password: passwordHash,
      fullname: 'Admin User',
      lastname: 'User',
      isAdmin: true,
    },
  });

  // PODCASTS
  const podcasts = await Promise.all([
    prisma.podcast.create({
      data: { title: 'Tech Talks', description: 'Latest in tech.', userId: bob.id },
    }),
    prisma.podcast.create({
      data: { title: 'Health Hub', description: 'All about health and fitness.', userId: bob.id },
    }),
    prisma.podcast.create({
      data: { title: 'Movie Mania', description: 'Cinema deep dives.', userId: bob.id },
    }),
    prisma.podcast.create({
      data: { title: 'Fashion Forward', description: 'Trends in fashion.', userId: alice.id },
    }),
    prisma.podcast.create({
      data: { title: 'Conspiracy Corner', description: 'The truth is out there.', userId: alice.id },
    }),
    prisma.podcast.create({
      data: { title: 'Music Mixdown', description: 'Everything music.', userId: alice.id },
    }),
  ]);

  // EPISODES (1–2 per podcast)
  const episodes = await Promise.all([
    prisma.episode.create({
      data: { title: 'AI in 2025', 
        description: 'What’s coming next?',
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3', 
        podcastId: podcasts[0].id },
    }),
    prisma.episode.create({
      data: { title: 'Tech Recap Q1', 
        description: 'Gadget updates.', 
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3',
         podcastId: podcasts[0].id },
    }),
    prisma.episode.create({
      data: { title: 'Workout Tips', 
        description: 'Get in shape.', 
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3', 
        podcastId: podcasts[1].id },
    }),
    prisma.episode.create({
      data: { 
        title: 'Nutrition Talk', 
        description: 'Superfoods explained.', 
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3',
         podcastId: podcasts[1].id },
    }),
    prisma.episode.create({
      data: { 
        title: 'Oscars Breakdown', 
        description: 'Winners and losers.',
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3',
         podcastId: podcasts[2].id },
    }),
    prisma.episode.create({
      data: { 
        title: 'Runway Trends', 
        description: 'Spring 2025 fashion.',
         audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3', podcastId: podcasts[3].id },
    }),
    prisma.episode.create({
      data: { title: 'Area 51 Truths', 
        description: 'Classified stories.',
         audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3', 
         podcastId: podcasts[4].id },
    }),
    prisma.episode.create({
      data: { title: 'Flat Earth Talk', 
        description: 'What do they believe?',
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3',
         podcastId: podcasts[4].id },
    }),
    prisma.episode.create({
      data: { title: 'Indie Music Vibes', 
        description: 'Discovering new bands.',
        audioUrl: 'https://cdn.example.com/audio/ai-2025.mp3', 
        podcastId: podcasts[5].id },
    }),
  ]);

  // COMMENTS
  await Promise.all([
    prisma.comment.create({
      data: {
        content: 'Loved this episode!',
        episodeId: episodes[0].id,
        userId: alice.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Interesting topic.',
        episodeId: episodes[1].id,
        userId: bob.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Please make more like this.',
        episodeId: episodes[2].id,
        userId: alice.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'So helpful!',
        episodeId: episodes[3].id,
        userId: admin.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'Conspiracies are wild 😳',
        episodeId: episodes[6].id,
        userId: bob.id,
      },
    }),
    prisma.comment.create({
      data: {
        content: 'I love this fashion advice!',
        episodeId: episodes[5].id,
        userId: admin.id,
      },
    }),
  ]);

  // XP / REWARDS
  await Promise.all([
    prisma.reward.create({
      data: {
        userId: bob.id,
        xp: 150,
        badge: 'Top Listener',
      },
    }),
    prisma.reward.create({
      data: {
        userId: alice.id,
        xp: 200,
        badge: 'Super Fan',
      },
    }),
  ]);

  console.log('✅ Seeding complete');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
