import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ProtegesPage from '../pages/Protege/ProtegesPage.jsx';

const protegesAddresses = new Meteor.Collection('protegesAddresses');

const mapProtegesDataForReact = (proteges) => {
  const currentYear = new Date().getFullYear();

  return proteges.map((protege) => ({
    name: protege.name,
    age: currentYear - protege.dateOfBirth.getFullYear(),
    address: `${protege.address.name}, ${protege.town.name}`,
    sponsor: protege.sponsor ? 'Da' : 'Ne',
    situation: protege.situation,
  }));
};

const ProtegesPageContainer = withTracker(() => {
  const publicHandle = Meteor.subscribe('proteges.addresses'); // eslint-disable-line no-unused-vars
  const protegesData = protegesAddresses.find().fetch();

  return {
    // user: Meteor.user(),
    // loading: !publicHandle.ready(),
    // connected: Meteor.status().connected,
    proteges: mapProtegesDataForReact(protegesData),
  };
})(ProtegesPage);

export default ProtegesPageContainer;
