//rabbitmq.js ( message broker)
import { connect } from 'amqplib';

let channel, connection;

export const connectRabbitMQ = async () => {
  try {
    connection = await connect(process.env.RABBITMQ_URI || 'amqp://localhost');
    channel = await connection.createChannel();
    await channel.assertQueue('notifications');
    console.log('Connected to RabbitMQ');
  } catch (error) {
    console.error('RabbitMQ connection error:', error);
  }
};

export const getChannel = () => channel;

// export default {
//   connectRabbitMQ,
//   getChannel
// };
