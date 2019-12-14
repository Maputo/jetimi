import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

const User = {
  get() {
    return Meteor.user() || {};
  },

  id() {
    return Meteor.userId();
  },

  isLoggedIn() {
    return !!Meteor.userId();
  },

  isLoggedOut() {
    return !User.isLoggedIn();
  },

  profile() {
    return User.get().profile;
  },

  create(opts, callback) {
    Accounts.createUser(opts, callback);
  },
};

export default User;
