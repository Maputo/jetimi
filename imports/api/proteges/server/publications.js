/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import Proteges from '../proteges.js';

Meteor.publish('proteges.public', function protegesPublic() {
  return Proteges.find({
    userId: { $exists: false },
  }, {
    fields: Proteges.publicFields,
  });
});
