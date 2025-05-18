import { Router } from 'express';
const router = Router();
import { sendNotification, getUserNotifications } from '../controllers/notification.controller';

router.post('/notifications', sendNotification);
router.get('/users/:id/notifications', getUserNotifications);

export default router;