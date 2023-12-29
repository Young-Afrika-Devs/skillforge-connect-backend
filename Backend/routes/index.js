// Backend/routes/index.js
import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as classController from '../controllers/class.controller.js';
import * as eventController from '../controllers/events.controller.js';

const router = express.Router();

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/request-password-reset', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);

// Class Routes
router.post('/create-class', classController.createClass);
router.get('/get-classes', classController.getClasses);
router.post('/enroll-in-class', classController.enrollInClass);
router.put('/update-class', classController.updateClass);
router.delete('/delete-class', classController.deleteClass);
router.get('/get-class/:classId', classController.getClassById);

// Event Routes
router.post('/create-event', eventController.createEvent);
router.get('/get-events', eventController.getEvents);
router.post('/enroll-in-event', eventController.enrollInEvent);
router.put('/update-event/:eventId', eventController.updateEvent);
router.delete('/delete-event', eventController.deleteEvent);
router.get('/get-event/:eventId', eventController.getEventById);

export default router;

