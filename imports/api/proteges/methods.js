import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { contains, pluck } from 'underscore';
import { Mongo } from 'meteor/mongo';

import Proteges from './proteges.js';

const update = new ValidatedMethod({
  name: 'proteges.update',
  validate: new SimpleSchema({
    id: { type: String },
    name: { type: String },
  }).validator(),
  run({ id, name }) {
    const mongoId = new Mongo.Collection.ObjectID(id);
    Proteges.update(mongoId, {
      $set: { name },
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
