import { getChannel } from '../config/rabbitmq.js';
import { sendEmail } from '../services/emailService.js';
import Notification from '../models/Notification.js';
import { sendSMS } from '../services/smsService.js';
import { sendInApp } from '../services/inAppService.js';

const MAX_RETRIES = 3;

const consumeMessages = async () => {
  const channel = getChannel();
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  }

  await channel.consume('notifications', async (msg) => {
    if (msg !== null) {
      const data = JSON.parse(msg.content.toString());
      const retryCount = data.retries || 0;

      console.log(`Received ${data.type} notification (retry: ${retryCount}):`, data.message);

      try {
        switch (data.type) {
          case 'email':
            await sendEmail(data);
            break;
          case 'sms':
            await sendSMS(data);
            break;
          case 'in-app':
            await sendInApp(data);
            break;
        }

        // Mark as sent
        await Notification.create({
          userId: data.userId,
          type: data.type,
          message: data.message,
          status: 'sent',
          retries: retryCount
        });

        channel.ack(msg);

      } catch (err) {
        console.error(`Notification failed:`, err.message);

        if (retryCount < MAX_RETRIES) {
          //Requeue with incremented retry count
          const updatedData = { ...data, retries: retryCount + 1 };
          channel.sendToQueue('notifications', Buffer.from(JSON.stringify(updatedData)));

          // Log retry attempt
          await Notification.create({
            userId: data.userId,
            type: data.type,
            message: data.message,
            status: 'retrying',
            retries: retryCount + 1
          });

        } else {
          //Max retries exceeded
          await Notification.create({
            userId: data.userId,
            type: data.type,
            message: data.message,
            status: 'failed',
            retries: retryCount
          });
        }

        channel.ack(msg);
      }
    }
  });
};


export { consumeMessages };
