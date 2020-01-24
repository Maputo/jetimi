import { Meteor } from 'meteor/meteor';
import Proteges from './proteges.js';

Meteor.methods({
  'proteges.update'({ id, obj }) {
    Proteges.update(id, { $set: obj });
  },
});
