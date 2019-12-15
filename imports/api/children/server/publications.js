/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';

import Children from '../children.js';

Meteor.publish('children.public', function childrenPublic() {
  return Children.find({
    userId: { $exists: false },
  }, {
    fields: Children.publicFields,
  });
});
