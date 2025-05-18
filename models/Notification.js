import { Schema, model } from 'mongoose';

const NotificationSchema = new Schema({
  userId: String,
  type: String,
  message: String,
  status: String,
  retries: { type: Number, default: 0 }
}, { timestamps: true });

export default model('Notification', NotificationSchema);