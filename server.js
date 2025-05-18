import express from 'express';
import bodyParser from 'body-parser';
import { connectRabbitMQ, getChannel } from './config/rabbitmq.js';
import { consumeMessages } from './queues/consumer.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


// API to send test messages
app.post('/send', async (req, res) => {
  try {
    const { type, message } = req.body;

    if (!type || !message) {
      return res.status(400).json({ error: 'type and message are required' });
    }

    const channel = getChannel();
    if (!channel) {
      return res.status(500).json({ error: 'RabbitMQ channel not initialized' });
    }

    const payload = { type, message };
    channel.sendToQueue('notifications', Buffer.from(JSON.stringify(payload)));

    res.status(200).json({ success: true, sent: payload });
  } catch (err) {
    console.error('Failed to send message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

(async () => {
  await connectDB();        
  await connectRabbitMQ();
  await consumeMessages();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
})();
