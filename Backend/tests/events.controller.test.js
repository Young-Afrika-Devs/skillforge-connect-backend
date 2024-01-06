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
