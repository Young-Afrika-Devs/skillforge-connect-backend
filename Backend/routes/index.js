// Backend/routes/index.js
import express from 'express';
import * as userController from '../controllers/user.controller.js';
import * as classController from '../controllers/class.controller.js';
import * as eventController from '../controllers/events.controller.js';
import { requireAdmin, authenticateUser } from '../utils/auth.middleware.js';


const router = express.Router();

// User Routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.post('/request-password-reset', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);

// Admin Routes
router.post('/setup-admin', userController.setupAdmin); // Setup admin user (first time only
router.post('/register-admin', requireAdmin, userController.registerAdmin); // Require admin for admin registration
router.get('/get-users', requireAdmin, userController.getAllUsers); // Require admin for getting all users

// class Routes
router.post('/create-class', requireAdmin, classController.createClass);
router.get('/get-classes', authenticateUser, classController.getUserClasses);
router.post('/enroll-in-class', authenticateUser, classController.enrollInClass);
router.put('/update-class', requireAdmin, classController.updateClass);
router.delete('/delete-class', requireAdmin, classController.deleteClass);
router.get('/get-class/:classId', classController.getClassById);


router.post('/create-event', requireAdmin, eventController.createEvent);
router.get('/get-events', authenticateUser, eventController.getUserEvents); /
router.post('/enroll-in-event', authenticateUser, eventController.enrollInEvent);
router.put('/update-event/:eventId', requireAdmin, eventController.updateEvent);
router.delete('/delete-event', requireAdmin, eventController.deleteEvent);
router.get('/get-event/:eventId', eventController.getEventById);

export default router;

