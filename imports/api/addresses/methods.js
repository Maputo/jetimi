import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { contains, pluck } from 'underscore';

import Addresses from './addresses.js';

const ADDRESS_VALIDATOR = new SimpleSchema({
  id: { type: String },
  name: { type: String },
  townId: { type: String },
}).validator();

const update = new ValidatedMethod({
  name: 'addresses.update',
  validate: ADDRESS_VALIDATOR,
  run({ ...obj }) {
    const mongoId = new Mongo.Collection.ObjectID(obj.id);
    console.log(Addresses.findOne(mongoId).fetch())
    // Addresses.update(mongoId, {
    //   $set: { ...obj },
    // });
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
