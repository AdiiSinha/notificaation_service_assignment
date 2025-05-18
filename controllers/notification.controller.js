import { create, find } from '../models/Notification';
import { sendToQueue } from '../queues/producer';

export async function sendNotification(req, res) {
  const { userId, type, message } = req.body;
  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const notification = await create({ userId, type, message, status: 'pending' });
  await sendToQueue(notification);
  res.status(200).json({ message: 'Notification queued' });
}

export async function getUserNotifications(req, res) {
  const userId = req.params.id;
  const notifications = await find({ userId });
  res.status(200).json(notifications);
}