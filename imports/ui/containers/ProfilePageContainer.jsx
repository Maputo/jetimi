import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import { isEmpty, omit, pick } from 'underscore';
import { update } from '../../api/proteges/methods.js';
import { ProtegesAggregate } from '../../api/collections.js';
import Addresses from '../../api/addresses/addresses.js';
import Towns from '../../api/towns/towns.js';
import ProfilePage from '../pages/Protege/ProfilePage.jsx';
import { EMPTY_OBJECT } from '../../../utils/DefaultProps.js';

const updateAddressAndTown = (obj) => {
  const address = pick(obj, 'address', 'addressId');
  const town = pick(obj, 'town', 'townId');

  if (!town.townId && town.town) {
    // insert town
    // insert address
    // return addressId
    return {};
  }

  if (!address.addressId && address.address) {
    // insert address
    // return addressId
    return {};
  }

  if (address.addressId) {
    return { addressId: address.addressId };
  }

  return {};
};

const updateProfile = (id, obj) => {
  const addressId = updateAddressAndTown(obj);
  const newObj = omit(obj, 'town', 'townId', 'address', 'addressId');

  const updateObject = { ...newObj, ...addressId };
  if (!isEmpty(updateObject)) {
    update.call({ id, ...updateObject }, (err) => {
      if (err) {
        console.error('error', err);
      } else {
        console.log('Update success: ', id);
      }
    });
  }
};

const mapAddressesToOptions = (addresses) => addresses.map((address) => (
  { text: address.name, town: address.townId, value: address._id }
));

const getAddresses = () => {
  const addresses = Addresses.find().fetch();
  return mapAddressesToOptions(addresses);
};

const mapTownsToOptions = (towns) => towns.map((town) => ({ text: town.name, value: town._id }));
const getTowns = () => {
  const towns = Towns.find().fetch();
  return mapTownsToOptions(towns);
};

const convertDate = (date) => {
  const fullYear = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  month = month.length < 2 ? `0${month}` : month;
  day = day.length < 2 ? `0${day}` : day;

  return `${fullYear}-${month}-${day}`;
};

const mapProtegeDataForReact = (proteges = []) => {
  if (proteges.length > 0) {
    const protege = proteges[0];

    return ({
      id: protege._id,
      name: protege.name,
      dateOfBirth: convertDate(protege.dateOfBirth),
      joinDate: convertDate(protege.joinDate),
      address: protege.address && protege.address.name,
      addressId: protege.address && protege.address._id,
      town: protege.town && protege.town.name,
      townId: protege.town && protege.town._id,
      sponsor: protege.sponsor ? 'Da' : 'Ne',
      situation: protege.situation,
      text: protege.text,
      gender: protege.gender,
    });
  }

  return EMPTY_OBJECT;
};

const ProfilePageContainer = withTracker((props) => {
  const protegeHandle = Meteor.subscribe('proteges.aggregate');
  const addressHandle = Meteor.subscribe('addresses.public');
  const townHandle = Meteor.subscribe('towns.public');

  const { match } = props;
  const { params = {} } = match;
  const { id } = params;

  const protegesData = ProtegesAggregate.find({ _id: { $eq: id } }).fetch();

  return {
    protege: mapProtegeDataForReact(protegesData),
    addresses: getAddresses(),
    towns: getTowns(),
    onUpdate: updateProfile,
    loading: !protegeHandle.ready() || !addressHandle.ready() || !townHandle.ready(),
  };
})(ProfilePage);

export default withRouter(ProfilePageContainer);
