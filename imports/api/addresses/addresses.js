import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Addresses = new Mongo.Collection('Addresses');

Addresses.schema = new SimpleSchema({
  _id: { type: String },
  name: { type: String },
  townId: { type: String },
});

// Deny all client-side updates since we will be using methods to manage this collection
// Addresses.deny({
//   insert() {
//     return true;
//   },
//   update() {
//     return true;
//   },
//   remove() {
//     return true;
//   },
// });

Addresses.attachSchema(Addresses.schema);

Addresses.publicFields = {
  _id: 1,
  name: 1,
  townId: 1,
};

export default Addresses;
