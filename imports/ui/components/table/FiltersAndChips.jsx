import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Filters from '../../containers/Filters.jsx';
import Chips from '../input/Chips.jsx';

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

const getChipsFromParams = (query) => {
  const filterParams = query
    ? query.split('?')[1].split('&').find((param) => param.startsWith('filter'))
    : '';

  if (filterParams) {
    return filterParams.split(':').map((param) => {
      const keyValue = param.split('-');

      return ({ key: keyValue[0], label: keyValue[1] });
    });
  }

  return [];
};

const FiltersAndChips = (props) => {
  const classes = useToolbarStyles();
  const { location } = props;

  const chips = getChipsFromParams(location.search);

  return (
    <Toolbar>

      <div className={classes.filters}>
        <Filters />
        <Chips chips={chips} />
      </div>

    </Toolbar>
  );
};

FiltersAndChips.propTypes = {
  location: PropTypes.object,
};

export default withRouter(FiltersAndChips);
