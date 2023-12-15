// Backend/models/class.model.js
import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  instructor: {
    type: String,
    trim: true,
  },
  schedule: {
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

const Class = mongoose.model('Class', classSchema);

export default Class;

