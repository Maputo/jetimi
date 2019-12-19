import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Towns = new Mongo.Collection('Towns');

Towns.schema = new SimpleSchema({
  name: { type: String },
});

// Deny all client-side updates since we will be using methods to manage this collection
Towns.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

Towns.attachSchema(Towns.schema);

Towns.publicFields = {
  _id: 1,
  name: 1,
};

export default Towns;
