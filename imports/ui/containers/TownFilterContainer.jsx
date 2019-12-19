import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Towns from '../../api/towns/towns.js';
import NativeSelects from '../components/input/NativeSelects.jsx';

const mapTownsToOptions = (towns) => towns.map((town) => ({ text: town.name, value: town._id }));

const TownFilterContainer = withTracker(() => {
  Meteor.subscribe('towns.public');
  const towns = Towns.find().fetch();

  return {
    id: 'town',
    label: 'Grad',
    options: mapTownsToOptions(towns),
  };
})(NativeSelects);

export default TownFilterContainer;
