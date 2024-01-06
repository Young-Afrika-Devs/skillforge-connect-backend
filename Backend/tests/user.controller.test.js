import request from 'supertest';
import mongoose from 'mongoose';
import server from '../server.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { loginUser } from '../controllers/user.controller.js';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../models/user.model');

describe('User Controller Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if email is not found', async () => {
    User.findOne.mockResolvedValueOnce(null);

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if password is invalid', async () => {
    const mockUser = {
      email: 'test@example.com',
      password: 'hashedPassword',
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(false);

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 200 with user data and token if login is successful', async () => {
    const mockUser = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user',
      isAdmin: false,
      _doc: {
        _id: 'user123',
        email: 'test@example.com',
        role: 'user',
        isAdmin: false,
      },
    };

    User.findOne.mockResolvedValueOnce(mockUser);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce('token123');

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res = {
      cookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { userId: 'user123', role: 'user', isAdmin: false },
      process.env.JWT_SECRET
    );
    expect(res.cookie).toHaveBeenCalledWith('access_token', 'token123', {
      httpOnly: true,
      maxAge: expect.any(Number),
      secure: expect.any(Boolean),
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: {
        _id: 'user123',
        email: 'test@example.com',
        role: 'user',
        isAdmin: false,
      },
      token: 'token123',
    });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with error if an error occurs', async () => {
    User.findOne.mockRejectedValueOnce(new Error('Database error'));

    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };

    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await loginUser(req, res, next);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toBe('Database error');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  })
});