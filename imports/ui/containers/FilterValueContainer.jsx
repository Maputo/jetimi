import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import Towns from '../../api/towns/towns.js';
import NativeSelects from '../components/input/NativeSelects.jsx';
import Filter from '/constants/FilterConstants.js';

const GENDERS = [
  {
    id: 'm',
    name: 'Muski',
  },
  {
    id: 'f',
    name: 'Zenski',
  },
];

const mapTownsToOptions = (towns) => towns.map((town) => ({ text: town.name, value: town._id }));
const mapGendersToOptions = (genders) => genders.map((gender) => (
  { text: gender.name, value: gender.id }
));

const getTowns = () => {
  const towns = Towns.find().fetch();
  return mapTownsToOptions(towns);
};

const getGenders = () => mapGendersToOptions(GENDERS);

const getOptionsForId = (filterId) => {
  switch (filterId) {
    case Filter.town.id:
      return getTowns();
    case Filter.gender.id:
      return getGenders();
    default:
      return [];
  }
};

const FilterValueContainer = withTracker((props) => {
  Meteor.subscribe('towns.public');

  return {
    id: 'filtervalue',
    label: props && props.filter ? props.filter.label : '',
    options: getOptionsForId(props && props.filter ? props.filter.id : ''),
  };
})(NativeSelects);

export default FilterValueContainer;
