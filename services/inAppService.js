export async function sendInApp(notification) {
  console.log('In-App Notification:', notification.message);
  return true;
}