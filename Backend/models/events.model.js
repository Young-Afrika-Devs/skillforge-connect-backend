import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
    },
    date: {
        type: String,
        trim: true,
    },
    capacity: {
        type: Number,
        default: 20, // Default capacity, adjust as needed
    },
    enrolledStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there's a User model
    }],
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;