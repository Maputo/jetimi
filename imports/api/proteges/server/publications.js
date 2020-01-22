/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';

import Proteges from '../proteges.js';

Meteor.publish('proteges.public', function protegesPublic() {
  return Proteges.find({
    userId: { $exists: false },
  }, {
    fields: Proteges.publicFields,
  });
});

Meteor.publish('proteges.full', function () {
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
  }], { clientCollection: 'protegesFull' });
});

Meteor.publish('proteges.single', function () {
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
  }], { clientCollection: 'protegesSingle' });
});
