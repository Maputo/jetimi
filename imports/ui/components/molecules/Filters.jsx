import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { map } from 'underscore';
import NativeSelects from '../atoms/NativeSelects.jsx';
import { NOOP, EMPTY_OBJECT } from '../../../../utils/DefaultProps.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5),
  },
}));

const mapFiltersToOptions = (filters) => map(filters, (value, key) => (
  { text: value.label, value: key }
));

const Filters = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState({});
  const { onFilterSelect, filterData } = props;

  const getFilterForId = (id) => {
    const ft = filterData[id];
    return ft ? { id, label: ft.label } : {};
  };

  const onFilterSelectCallback = (filterId) => setFilter(getFilterForId(filterId));

  const handleFilterSelect = (filterId) => (filterValue) => {
    onFilterSelect({ id: filterId, value: filterValue });
  };

  const getOptionsForId = (filterId) => (filterId ? filterData[filterId].values : []);

  return (
    <div className={classes.root}>
      <NativeSelects
        id="filter"
        label="Filter"
        options={mapFiltersToOptions(filterData)}
        onSelect={onFilterSelectCallback}
      />
      <NativeSelects
        id="filtervalue"
        label={filter ? filter.label : ''}
        options={getOptionsForId(filter ? filter.id : '')}
        onSelect={handleFilterSelect(filter.id)}
      />
    </div>
  );
};

Filters.propTypes = {
  onFilterSelect: PropTypes.func,
  filterData: PropTypes.object,
};

Filters.defaultProps = {
  onFilterSelect: NOOP,
  filterData: EMPTY_OBJECT,
};

export default withRouter(Filters);
