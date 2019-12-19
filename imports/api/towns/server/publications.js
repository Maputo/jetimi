/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import Towns from '../towns.js';

Meteor.publish('towns.public', function protegesPublic() {
  return Towns.find({
    userId: { $exists: false },
  }, {
    fields: Towns.publicFields,
  });
});
