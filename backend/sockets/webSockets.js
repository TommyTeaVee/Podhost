const WebSocket = require('ws');
const prisma = require('./utils/prisma');

const wss = new WebSocket.Server({ port: 7070 });
console.log('🎧 WebSocket listener running on :7070');

const sessions = {};

wss.on('connection', (ws) => {
  ws.on('message', async (msg) => {
    try {
      const { userId, episodeId, type } = JSON.parse(msg);

      if (type === 'ping') {
        const key = `${userId}-${episodeId}`;
        sessions[key] = (sessions[key] || 0) + 5; // assume ping every 5s
      }

      if (type === 'end') {
        const key = `${userId}-${episodeId}`;
        const duration = sessions[key] || 0;

        if (duration > 0) {
          await prisma.listenerSession.create({
            data: { userId, episodeId, duration },
          });
        }

        delete sessions[key];
      }
    } catch (e) {
      console.error('WebSocket error:', e.message);
    }
  });
});
