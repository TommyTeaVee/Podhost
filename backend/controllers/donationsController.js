const prisma = require('../utils/prisma');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.donate = async (req, res) => {
  const { amount, podcastId } = req.body;

  const podcast = await prisma.podcast.findUnique({ where: { id: podcastId } });
  if (!podcast) return res.status(404).json({ error: 'Podcast not found' });

  // OPTIONAL: Record donation in DB
  const donation = await prisma.donation.create({
    data: {
      userId: req.user.id,
      podcastId,
      amount,
    },
  });

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: `Donate to ${podcast.title}`,
        },
        unit_amount: Math.floor(amount * 100),
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/donate/success',
    cancel_url: 'http://localhost:3000/donate/cancel',
  });

  res.json({ url: session.url });
};
