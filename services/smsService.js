export async function sendSMS(notification) {
  console.log('Sending SMS:', notification.message);
  return true;
}