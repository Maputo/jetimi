/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

import Proteges from '../proteges.js';

Meteor.publish('proteges.aggregate', function () {
  ReactiveAggregate(this, Proteges, [{
    $lookup: {
      from: 'Addresses',
      localField: 'addressId',
      foreignField: '_id',
      as: 'address',
    },
  }, {
    $unwind: '$address',
  }, {
    $lookup:
      {
        from: 'Towns',
        localField: 'address.townId',
        foreignField: '_id',
        as: 'town',
      },
  }, {
    $unwind: '$town',
  }], { clientCollection: 'ProtegesAggregate' });
});
