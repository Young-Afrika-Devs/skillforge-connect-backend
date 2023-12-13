import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../models/user.model.js';

export const registerUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { username, email, password } = value;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        if (error.code === 11000) {
            next(new Error('User already exists'));
        } else {
            next(error);
        }
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            throw new Error(error.details[0].message);
        }

        const { email, password } = value;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET);
        const { password: userPassword, ...rest } = user._doc;

        // Set the access token as a cookie
        res.cookie('access_token', token, { httpOnly: true, maxAge: Number(process.env.JWT_EXPIRATION), secure: process.env.NODE_ENV === 'deployment' })
           .status(200)
           .json({ user: rest, token });
    } catch (error) {
        next(error);
    }
};

export const requestPasswordReset = async(req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User does not exist'});
        }

        const resetToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h'});

        // Create a password reset link that the user can click on
        const resetLink = `http://localhost:3000/password-reset/${resetToken}`;

        // Send resetToken to user's email.
        // You can use a mailer service like SendGrid, Mailgun, etc.
        // For the purpose of this example, we'll assume you have a function sendEmail() that does this.
        await sendEmail(resetToken, email);

        res.status(200).json({ message: 'Password reset link has been sent to your email'});
    } catch (error) {
        next(error);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { resetToken, password } = req.body;

        // Verify that the reset token is valid
        const payload = jwt.verify(resetToken, process.env.JWT_SECRET);

        const user = await User.findById(payload.userId);

        if (!user) {
            return res.status(404).json({ message: 'Invalid or expired password reset token'});
        }

        // Hash the new password and save it to the user
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successful'});
    } catch (error) {
        next(error);
    }
}

export default { registerUser, loginUser, requestPasswordReset, resetPassword };