import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FilterValueContainer from '../../containers/FilterValueContainer.jsx';
import Filter from '/constants/FilterConstants.js';
import { NOOP } from '/constants/DefaultProps.js';
import NativeSelects from '../atoms/NativeSelects';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5),
  },
}));

export const FILTERS = Object.values(Filter);

const mapFiltersToOptions = (filters) => filters.map((filter) => (
  { text: filter.label, value: filter.id }
));

const getFilterForId = (id) => {
  const filter = FILTERS.find((f) => f.id === id);
  return filter || {};
};

const Filters = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState({});
  const { onFilterSelect } = props;

  const onFilterSelectCallback = (filterId) => setFilter(getFilterForId(filterId));

  const handleFilterSelect = (filterId) => (filterValue) => {
    onFilterSelect({ id: filterId, value: filterValue });
  };

  return (
    <div className={classes.root}>
      <NativeSelects
        id="filter"
        label="Filter"
        options={mapFiltersToOptions(FILTERS)}
        onSelect={onFilterSelectCallback}
      />
      <FilterValueContainer filter={filter} onSelect={handleFilterSelect(filter.id)} />
    </div>
  );
};

Filters.propTypes = {
  onFilterSelect: PropTypes.func,
};

Filters.defaultProps = {
  onFilterSelect: NOOP,
};

export default withRouter(Filters);
