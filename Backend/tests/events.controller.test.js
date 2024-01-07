<<<<<<< HEAD
import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { enrollInEvent } from '../controllers/events.controller.js';
import User from '../models/user.model.js';
import Event from '../models/events.model.js';

describe('Events Controller Tests', () => {
  let req, res, next, session;

  beforeEach(() => {
    req = {
      body: {
        eventId: 'event123',
        userId: 'user123',
      },
    };

    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    next = sinon.stub();

    session = {
      startTransaction: sinon.stub(),
      commitTransaction: sinon.stub(),
      abortTransaction: sinon.stub(),
      endSession: sinon.stub(),
    };

    sinon.stub(mongoose, 'startSession').returns(session);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should enroll user in event successfully', async () => {
    const user = {
      _id: 'user123',
    };

    const event = {
      _id: 'event123',
      enrolledStudents: [],
      capacity: 10,
      save: sinon.stub(),
    };

    sinon.stub(User, 'findById').resolves(user);
    sinon.stub(Event, 'findById').resolves(event);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(Event.findById.calledOnceWithExactly('event123')).to.be.true;
    expect(event.enrolledStudents).to.deep.equal(['user123']);
    expect(event.save.calledOnce).to.be.true;
    expect(session.commitTransaction.calledOnce).to.be.true;
    expect(res.status.calledOnceWithExactly(200)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'Enrolled in event successfully' })).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });

  it('should return 404 if user is not found', async () => {
    sinon.stub(User, 'findById').resolves(null);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(res.status.calledOnceWithExactly(404)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'User not found' })).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });

  it('should return 404 if event is not found', async () => {
    sinon.stub(User, 'findById').resolves({});
    sinon.stub(Event, 'findById').resolves(null);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(Event.findById.calledOnceWithExactly('event123')).to.be.true;
    expect(res.status.calledOnceWithExactly(404)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'Event not found' })).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });

  it('should return 400 if user is already enrolled in the event', async () => {
    const user = {
      _id: 'user123',
    };

    const event = {
      _id: 'event123',
      enrolledStudents: ['user123'],
    };

    sinon.stub(User, 'findById').resolves(user);
    sinon.stub(Event, 'findById').resolves(event);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(Event.findById.calledOnceWithExactly('event123')).to.be.true;
    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'You are already enrolled in this event' })).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });

  it('should return 400 if event is full', async () => {
    const user = {
      _id: 'user123',
    };

    const event = {
      _id: 'event123',
      enrolledStudents: ['user456', 'user789'],
      capacity: 2,
    };

    sinon.stub(User, 'findById').resolves(user);
    sinon.stub(Event, 'findById').resolves(event);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(Event.findById.calledOnceWithExactly('event123')).to.be.true;
    expect(res.status.calledOnceWithExactly(400)).to.be.true;
    expect(res.json.calledOnceWithExactly({ message: 'This event is full' })).to.be.true;
    expect(next.notCalled).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });

  it('should call next with error if an error occurs', async () => {
    const error = new Error('Database error');

    sinon.stub(User, 'findById').rejects(error);

    await enrollInEvent(req, res, next);

    expect(User.findById.calledOnceWithExactly('user123')).to.be.true;
    expect(next.calledOnceWithExactly(error)).to.be.true;
    expect(session.abortTransaction.calledOnce).to.be.true;
    expect(session.endSession.calledOnce).to.be.true;
  });
});
=======
// events.controller.test.js

import chai from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import * as controller from '../controllers/events.controller.js';
import Event from '../models/events.model.js';
import User from '../models/user.model.js';

const { expect } = chai;

describe('Events Controller Tests', () => {
  describe('enrollInEvent', () => {
    let req, res, next, status, json, session;

    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
      next = sinon.stub();
      session = { 
        startSession: sinon.stub(),
        startTransaction: sinon.stub(),
        endSession: sinon.stub(),
        abortTransaction: sinon.stub(),
      };
      mongoose.startSession = sinon.stub().returns(session);
      req = { body: { eventId: 'eventId123', userId: 'userId123' } };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should enroll user in event successfully', async () => {
      const user = { _id: 'userId123' };
      const event = { _id: 'eventId123', enrolledStudents: [], save: sinon.stub() };

      // Stub the save method
      event.save = sinon.stub().callsFake(async function() {
        // Simulate the save method pushing the user id to the enrolledStudents array
        this.enrolledStudents.push(user._id);
      });

      sinon.stub(User, 'findById').resolves(user);
      sinon.stub(Event, 'findById').resolves(event);

      await controller.enrollInEvent(req, res, next);

      // Assertion: Check if the user is enrolled in the event
      expect(event.enrolledStudents).to.include(user._id);
      // Assertion: Check if the response status is set to 200
      /* expect(res.status).to.have.been.calledWith(200); */
      sinon.assert.calledWith(res.status, 200);
      // Assertion: Check if the response json contains the expected message
      /* expect(res.json).to.have.been.calledWith({ message: 'Enrolled in event successfully' }); */
      sinon.assert.calledWith(res.json, { message: 'Enrolled in event successfully' });
    });

    it('should handle user not found and return 404', async () => {
      sinon.stub(User, 'findById').resolves(null);

      await controller.enrollInEvent(req, res, next);

      // Assertion: Check if the response status is set to 404
      /* expect(res.status).to.have.been.calledWith(404); */
      sinon.assert.calledWith(res.status, 404);
      // Assertion: Check if the response json contains the expected message
      /* expect(res.json).to.have.been.calledWith({ message: 'User not found' }); */
      sinon.assert.calledWith(res.json, { message: 'User not found' });
    });

    it('should handle event not found and return 404', async () => {
      sinon.stub(User, 'findById').resolves({});
      sinon.stub(Event, 'findById').resolves(null);

      await controller.enrollInEvent(req, res, next);

      // Assertion: Check if the response status is set to 404
      /* expect(res.status).to.have.been.calledWith(404); */
      sinon.assert.calledWith(res.status, 404);
      // Assertion: Check if the response json contains the expected message
      /* expect(res.json).to.have.been.calledWith({ message: 'Event not found' }); */
      sinon.assert.calledWith(res.json, { message: 'Event not found' });
    });

    // Add more tests here for other scenarios (e.g., user already enrolled, event full, database error)
  });
});
>>>>>>> 2c266563e1009cc9bf18342ba9c2f370e9338a46
