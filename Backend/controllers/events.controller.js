import mongoose from 'mongoose';
import Event from '../models/events.model.js';
import User from '../models/user.model.js';
import { errorHandler }  from '../utils/errorHandler.js';
import Joi from 'joi';

export const createEvent = async (req, res, next) => {
    try {
        const schema = Joi.object({
            eventName: Joi.string().required(),
            description: Joi.string().required(),
            location: Joi.string().required(),
            date: Joi.string().required(),
            capacity: Joi.number().integer().min(1).required(),
        });

        // Check if event already exists
        const { error } = schema.validate(req.body);

        if (error) {
            const message = error.details.map(e => e.message);
            return res.status(400).json({ message });
        }

        // Create new event
        const { eventName, description, location, date, capacity } = req.body;

        const newEvent = new Event({
            eventName,
            description,
            location,
            date,
            capacity,
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event created successfully', newEvent });
        } catch (error) {
            next(error);
        }
}

export const getEvents = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Add query parameter for filtering events after a specific date
        const startDate = req.query.startDate; 

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let query = Event.find().sort({ date: -1 }).skip(startIndex).limit(limit);

        if (startDate) {
            // Filter events happening after the specified date
            query = query.where('date').gte(startDate); 
        }

        const events = await query.exec();

        const total = await Event.countDocuments();

        const pagination = {
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        };

        res.status(200).json({ events, pagination });
    } catch (error) {
        if (error.name === 'MongoNetworkError') {
            return res.status(500).json({ message: 'Unable to connect to database'})
        }
        next(error);
    }
}

export const enrollInEvent = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { eventId, userId } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const event = await Event.findById(eventId).session(session);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        if (event.enrolledStudents.includes(userId)) {
            return res.status(400).json({ message: 'You are already enrolled in this event' });
        }

        if (event.enrolledStudents.length >= event.capacity) {
            return res.status(400).json({ message: 'This event is full' });
        }

        event.enrolledStudents.push(userId);
        await event.save();
        await session.commitTransaction();

        res.status(200).json({ message: 'Enrolled in event successfully' });
    } catch (error) {
        await session.abortTransaction();
        next(error);
    } finally {
        session.endSession();
    }
}


export const updateEvent = async (req, res, next) => {
    try {
        const { updateFields } = req.body;
        const { eventId } = req.params;

        // Validate update fields
        const allowedUpdates = ['eventName', 'description', 'location', 'date', 'capacity'];
        const updates = Object.keys(updateFields);

        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).json({ message: 'Invalid updates' });
        }

        const event = await Event.findByIdAndUpdate(eventId, updateFields, { new: true });

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event });
    } catch (error) {
        next(error);
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const { eventId } = req.body;

        // Validate event ID
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' })
        }

        const event = await Event.findByIdAndDelete(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Delete associated data (example: enrollments)
        // await Enrollment.deleteMany({ eventId });

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        next(error);
    }
}

export const getEventById = async (req, res, next) => {
    try {
        const { eventId } = req.params;

        // Validate event ID
        if (!mongoose.Types.ObjectId.isValid(eventId)) {
            return res.status(400).json({ message: 'Invalid event ID' })
        }

        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        next(error);
    }
}