import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router';
import { extend } from 'underscore';

import ProtegesPage from '../pages/Protege/ProtegesPage.jsx';
import { mapParamsToFilters } from '../../../utils/FilterHelpers.js';
import { ProtegesAggregate } from '../../api/collections.js';

const getQuery = (param) => {
  switch (param.id) {
    case 'town':
      return { 'town._id': { $eq: param.value } };
    case 'gender':
      return { gender: { $eq: param.value } };
    default:
      return {};
  }
};

const buildQuery = (params) => params.reduce((obj, item) => extend(obj, getQuery(item)), {});

const mapProtegesDataForReact = (proteges) => {
  const currentYear = new Date().getFullYear();

  return proteges.map((protege) => ({
    id: protege._id,
    name: protege.name,
    age: currentYear - protege.dateOfBirth.getFullYear(),
    address: `${protege.address.name}, ${protege.town.name}`,
    sponsor: protege.sponsor ? 'Da' : 'Ne',
    situation: protege.situation,
  }));
};

const ProtegesPageContainer = withTracker((props) => {
  const publicHandle = Meteor.subscribe('proteges.aggregate'); // eslint-disable-line no-unused-vars

  const { location } = props;
  const params = mapParamsToFilters(location.search);
  const protegesData = ProtegesAggregate.find(buildQuery(params)).fetch();
  return {
    // user: Meteor.user(),
    // loading: !publicHandle.ready(),
    // connected: Meteor.status().connected,
    proteges: mapProtegesDataForReact(protegesData),
  };
})(ProtegesPage);

export default withRouter(ProtegesPageContainer);
