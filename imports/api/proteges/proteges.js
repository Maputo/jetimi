import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

class ProtegesCollection extends Mongo.Collection {
  insert(protege, callback) {
    return super.insert(protege, callback);
  }

  update(selector, modifier) {
    return super.update(selector, modifier);
  }

  remove(selector) {
    return super.remove(selector);
  }
}

const Proteges = new ProtegesCollection('Proteges');

Proteges.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Proteges.schema = new SimpleSchema({
  _id: { type: String },
  name: { type: String, optional: true },
  dateOfBirth: { type: Date, optional: true },
  joindate: { type: Date, optional: true },
  addressId: { type: String, optional: true },
  text: { type: String, optional: true },
  sponsor: { type: Boolean, optional: true },
  situation: { type: Number, optional: true },
  gender: { type: String, optional: true },
});

Proteges.attachSchema(Proteges.schema);

Proteges.publicFields = {
  name: 1,
  dateOfBirth: 1,
  joinDate: 1,
  address: 1,
  sponsor: 1,
  situation: 1,
  text: 1,
  gender: 1,
};

export default Proteges;
