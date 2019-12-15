import { Mongo } from 'meteor/mongo';

const Children = new Mongo.Collection('Children');

Children.publicFields = {
  name: 1,
  dateOfBirth: 1,
  address: 1,
  sponsor: 1,
  situation: 1,
};

export default Children;
