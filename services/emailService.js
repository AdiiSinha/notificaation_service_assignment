export async function sendEmail(notification) {
  if (notification.shouldFail) {
    throw new Error('Simulated email failure');
  }
  console.log('Sending Email:', notification.message);
  return true;
}
