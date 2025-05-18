
import { getChannel } from '../config/rabbitmq';

const publishToQueue = async (data) => {
  const channel = getChannel();
  if (!channel) {
    console.error('RabbitMQ channel not initialized');
    return;
  }
  await channel.sendToQueue('notifications', Buffer.from(JSON.stringify(data)));
};

export default { publishToQueue };
