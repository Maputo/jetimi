import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Towns from '../../api/towns/towns.js';
import Gender from '../../../constants/GenderConstants';
import FiltersAndChips from '../components/organisms/FiltersAndChips.jsx';

const GENDERS = Object.values(Gender);

const mapTownsToOptions = (towns) => towns.map((town) => ({ text: town.name, value: town._id }));
const mapGendersToOptions = (genders) => genders.map((gender) => (
  { text: gender.label, value: gender.id }
));

const getTowns = () => {
  const towns = Towns.find().fetch();
  return mapTownsToOptions(towns);
};

const getGenders = () => mapGendersToOptions(GENDERS);

const buildFilterData = () => ({
  town: {
    label: 'Grad',
    values: getTowns(),
  },
  gender: {
    label: 'Pol',
    values: getGenders(),
  },
});

const FiltersAndChipsContainer = withTracker(() => {
  Meteor.subscribe('towns.public');

  return {
    filterData: buildFilterData(),
  };
})(FiltersAndChips);

export default FiltersAndChipsContainer;
