import { Mongo } from 'meteor/mongo';

const Children = new Mongo.Collection('Children');

Children.publicFields = {
  name: 0,
  dateOfBirth: 0,
  address: 0,
  sponsor: 0,
  situation: 0,
};

export default Children;
