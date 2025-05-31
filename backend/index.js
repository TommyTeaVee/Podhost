const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/podcasts', require('./routes/podcastsRoutes'));
app.use('/api/episodes', require('./routes/episodesRoutes'));
app.use('/api/comments', require('./routes/commentsRoutes'));
app.use('/api/donations', require('./routes/donationsRoutes'));
 app.use('/api/admin', require('./routes/adminRoutes'));
 

// Health check
app.get('/', (_, res) => res.send('🎧 PodHost API running'));

module.exports = app;
