import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { contains, pluck } from 'underscore';

import Proteges from './proteges.js';

const PROTEGE_VALIDATOR = new SimpleSchema({
  id: { type: String },
  name: { type: String, optional: true },
  dateOfBirth: { type: Date, optional: true },
  joinDate: { type: Date, optional: true },
  addressId: { type: String, optional: true },
  text: { type: String, optional: true },
  sponsor: { type: Boolean, optional: true },
  situation: { type: Number, optional: true },
  gender: { type: String, optional: true },
}).validator();

const update = new ValidatedMethod({
  name: 'proteges.update',
  validate: PROTEGE_VALIDATOR,
  run({ ...obj }) {
    Proteges.update(obj.id, {
      $set: { ...obj },
    });
  },
});


// Get list of all method names on Lists
const LISTS_METHODS = pluck([
  update,
], 'name');

if (Meteor.isServer) {
  // Only allow 5 protege operations per connection per second
  DDPRateLimiter.addRule({
    name(name) {
      return contains(LISTS_METHODS, name);
    },

    // Rate limit per connection ID
    connectionId() {
      return true;
    },
  }, 5, 1000);
}

export {
  update,
};
