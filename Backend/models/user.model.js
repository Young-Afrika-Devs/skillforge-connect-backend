import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        validate: {
            validator: value => value.length >= 3,
            message: () => `Username must be at least 3 characters long`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: value =>{
            const regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return regex.test(value);
        },
        message: () => `Please enter a valid email!`
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: value => value.length >= 8,
            message: () => `Password must be at least 8 characters long`
        }
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
