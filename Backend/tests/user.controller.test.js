import { loginUser } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { expect } from 'chai';
import chai from 'chai';

chai.use(sinonChai);

describe('loginUser', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'password123'
      }
    };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a token if login is successful', async () => {
    const user = {
      _id: 'user_id',
      email: 'test@example.com',
      password: 'hashed_password'
    };

    sinon.stub(User, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(true);
    sinon.stub(jwt, 'sign').returns('token');

    await loginUser(req, res, next);

    expect(User.findOne).to.have.been.calledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).to.have.been.calledWith('password123', 'hashed_password');
    expect(jwt.sign).to.have.been.calledWith({ userId: 'user_id' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ token: 'token' });
    expect(next).to.not.have.been.called;
  });

  it('should return an error if email is invalid', async () => {
    const error = new Error('Invalid email or password');

    sinon.stub(User, 'findOne').resolves(null);

    await loginUser(req, res, next);

    expect(User.findOne).to.have.been.calledWith({ email: 'test@example.com' });
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Invalid email or password' });
    expect(next).to.not.have.been.called;
  });

  it('should return an error if password is invalid', async () => {
    const user = {
      _id: 'user_id',
      email: 'test@example.com',
      password: 'hashed_password'
    };

    sinon.stub(User, 'findOne').resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(false);

    await loginUser(req, res, next);

    expect(User.findOne).to.have.been.calledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).to.have.been.calledWith('password123', 'hashed_password');
    expect(res.status).to.have.been.calledWith(401);
    expect(res.json).to.have.been.calledWith({ message: 'Invalid credentials' });
    expect(next).to.not.have.been.called;
  });

  it('should call the error handler if an error occurs', async () => {
    const error = new Error('Some error');

    sinon.stub(User, 'findOne').rejects(error);

    await loginUser(req, res, next);

    expect(User.findOne).to.have.been.calledWith({ email: 'test@example.com' });
    expect(next).to.have.been.calledWith(error);
    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
  });
});
