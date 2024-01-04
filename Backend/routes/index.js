// Backend/routes/index.js
import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as classController from '../controllers/class.controller.js';
import * as eventController from '../controllers/events.controller.js';
import { requireAdmin } from '../utils/authMiddleware.js'; // Import the requireAdmin middleware

const router = express.Router();

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/request-password-reset', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);

// Class Routes
router.post('/create-class', requireAdmin, classController.createClass); // Require admin for class creation
router.get('/get-classes', classController.getClasses);
router.post('/enroll-in-class', classController.enrollInClass);
router.put('/update-class', requireAdmin, classController.updateClass); // Require admin for class update
router.delete('/delete-class', requireAdmin, classController.deleteClass); // Require admin for class deletion
router.get('/get-class/:classId', classController.getClassById);

// Event Routes
router.post('/create-event', requireAdmin, eventController.createEvent); // Require admin for event creation
router.get('/get-events', eventController.getEvents);
router.post('/enroll-in-event', eventController.enrollInEvent);
router.put('/update-event/:eventId', requireAdmin, eventController.updateEvent); // Require admin for event update
router.delete('/delete-event', requireAdmin, eventController.deleteEvent); // Require admin for event deletion
router.get('/get-event/:eventId', eventController.getEventById);

export default router;

