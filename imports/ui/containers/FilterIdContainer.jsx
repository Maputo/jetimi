import { withTracker } from 'meteor/react-meteor-data';
import NativeSelects from '../components/input/NativeSelects.jsx';

const mapFiltersToOptions = (filters) => filters.map((filter) => (
  { text: filter.label, value: filter.id }
));

const FilterIdContainer = withTracker((props) => {
  return {
    id: 'filter',
    label: 'Filter',
    options: mapFiltersToOptions(props.filters),

    onSelect: props.onSelect,
  };
})(NativeSelects);

export default FilterIdContainer;
