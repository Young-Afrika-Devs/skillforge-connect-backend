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

export default registerUser;