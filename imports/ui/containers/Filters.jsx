import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FilterIdContainer from './FilterIdContainer.jsx';
import FilterValueContainer from './FilterValueContainer.jsx';
import Filter from '/constants/FilterConstants.js';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: theme.spacing(0.5),
  },
}));

const NOOP = () => {
};
const FILTERS = Object.values(Filter);

const getFilterForId = (id) => FILTERS.find((f) => f.ID === id);

const Filters = (props) => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState({});

  const { history } = props;

  const onFilterSelectCallback = (filterId) => setFilter(getFilterForId(filterId));

  const onFilterValueSelectCallback = (filterValue) => {
    if (filterValue) {
      history.push({
        pathname: '/p/list',
        search: `?filter=${filter.ID}-${filterValue}`,
      });
    }
  };

  return (
    <div className={classes.root}>
      <FilterIdContainer filters={FILTERS} onSelect={onFilterSelectCallback} />
      <FilterValueContainer filter={filter} onSelect={onFilterValueSelectCallback} />
    </div>
  );
};

export default withRouter(Filters);
