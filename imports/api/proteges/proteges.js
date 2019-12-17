import { Mongo } from 'meteor/mongo';

const Proteges = new Mongo.Collection('Proteges');

Proteges.publicFields = {
  name: 1,
  dateOfBirth: 1,
  address: 1,
  sponsor: 1,
  situation: 1,
};

export default Proteges;
