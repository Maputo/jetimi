/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import Addresses from '../addresses.js';

Meteor.publish('addresses.public', function addressesPublic() {
  return Addresses.find({
    userId: { $exists: false },
  }, {
    fields: Addresses.publicFields,
  });
});
