import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { contains, pluck } from 'underscore';

import Towns from './towns.js';

const TOWN_VALIDATOR = new SimpleSchema({
  name: { type: String },
}).validator();

const insert = new ValidatedMethod({
  name: 'towns.insert',
  validate: TOWN_VALIDATOR,
  run({ ...obj }) {
    obj._id = new Mongo.Collection.ObjectID().str;
    return Towns.insert(obj);
  },
});

// Get list of all method names on Lists
const LISTS_METHODS = pluck([
  insert,
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
  insert,
};
