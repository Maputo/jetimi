import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Filters from '../molecules/Filters.jsx';
import Chips from '../atoms/Chips.jsx';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    width: '100%',
    alignItems: 'right',
  },
  filters: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'column',
  },
}));

const mapParamsToString = (params) => {
  const pairsArray = params.map((param) => `${param.id}-${param.value}`);
  return pairsArray.join(':');
};

const FiltersAndChips = (props) => {
  const classes = useToolbarStyles();
  const { location, history, filterData } = props;

  const mapParamsToFilters = (query) => {
    const filterParams = query
      ? query.split('?')[1].split('&')
        .find((param) => param.startsWith('filter'))
        .split('=')[1]
      : '';

    if (filterParams) {
      return filterParams.split(':')
        .map((param) => {
          const keyValue = param.split('-');
          return ({ id: keyValue[0], value: keyValue[1] });
        }).reduce((obj, item) => {
          const name = filterData[item.id].values.find((f) => f.value === item.value);
          item.label = `${filterData[item.id].label}: ${name ? name.text : ''}`;
          obj[item.id] = item;
          return obj;
        }, {});
    }

    return {};
  };

  const updateFilters = (filters) => {
    history.push({
      pathname: '/p/list',
      search: `?filter=${filters}`,
    });
  };

  const addFilter = (filter) => {
    if (filter.value) {
      const filters = mapParamsToFilters(location.search);
      filters[filter.id] = filter;
      updateFilters(mapParamsToString(Object.values(filters)));
    }
  };

  const removeFilter = (filter) => {
    const filters = mapParamsToFilters(location.search);
    delete filters[filter.id];
    updateFilters(mapParamsToString(Object.values(filters)));
  };

  const chips = Object.values(mapParamsToFilters(location.search)) || [];

  return (
    <Toolbar>

      <div className={classes.filters}>
        <Filters onFilterSelect={addFilter} filterData={filterData} />
        <Chips chips={chips} onDelete={removeFilter} />
      </div>

    </Toolbar>
  );
};

FiltersAndChips.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  filterData: PropTypes.object.isRequired,
};

export default withRouter(FiltersAndChips);
