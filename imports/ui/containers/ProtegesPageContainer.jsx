import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ProtegesPage from '../pages/Protege/ProtegesPage.jsx';

const protegesAddresses = new Meteor.Collection('protegesAddresses');

const mapProtegesDataForReact = (proteges) => proteges.map((protege) => ({
  name: protege.name,
  dateOfBirth: protege.dateOfBirth && protege.dateOfBirth.toLocaleDateString(),
  address: `${protege.address.name}, ${protege.town.name}`,
  sponsor: protege.sponsor,
  situation: protege.situation,
}));

const ProtegesPageContainer = withTracker(() => {
  const publicHandle = Meteor.subscribe('proteges.addresses');
  const protegesData = protegesAddresses.find().fetch();

  return {
    user: Meteor.user(),
    loading: !publicHandle.ready(),
    connected: Meteor.status().connected,
    proteges: mapProtegesDataForReact(protegesData),
  };
})(ProtegesPage);

export default ProtegesPageContainer;
