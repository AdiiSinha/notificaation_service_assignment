//  Using MongoDB here to store and track notification statuses and retry attempts persistently.

import { connect } from 'mongoose';
export async function connectDB() {
  await connect(process.env.MONGODB_URI);
  console.log('MongoDB connected');
}