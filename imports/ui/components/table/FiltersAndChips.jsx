import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Filters from '../../containers/Filters.jsx';
import Chips from '../input/Chips.jsx';
import { EMPTY_OBJECT } from '../../../../constants/DefaultProps.js';

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

const mapParams = (query) => {
  const filterParams = query
    ? query.split('?')[1].split('&')
      .find((param) => param.startsWith('filter'))
      .split('=')[1]
    : '';

  if (filterParams) {
    return filterParams.split(':').map((param) => {
      const keyValue = param.split('-');

      return ({ id: keyValue[0], value: keyValue[1] });
    }).reduce((obj, item) => {
      obj[item.id] = item;
      return obj;
    }, {});
  }

  return {};
};

const mapParamsToString = (params) => {
  const pairsArray = params.map((param) => `${param.id}-${param.value}`);
  return pairsArray.join(':');
};

const deleteChip = (chip) => {
};

const FiltersAndChips = (props) => {
  const classes = useToolbarStyles();
  const { location, history } = props;

  const addFilter = (filter) => {
    if (filter.value) {
      const params = mapParams(location.search);
      params[filter.id] = filter;

      history.push({
        pathname: '/p/list',
        search: `?filter=${mapParamsToString(Object.values(params))}`,
      });
    }
  };

  const chips = Object.values(mapParams(location.search)) || [];

  return (
    <Toolbar>

      <div className={classes.filters}>
        <Filters onFilterSelect={addFilter} />
        <Chips chips={chips} onDelete={deleteChip} />
      </div>

    </Toolbar>
  );
};

FiltersAndChips.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

FiltersAndChips.defaultProps = {
  location: EMPTY_OBJECT,
  history: EMPTY_OBJECT,
};

export default withRouter(FiltersAndChips);
