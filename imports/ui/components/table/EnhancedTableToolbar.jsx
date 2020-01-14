import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Filters from '../../containers/Filters.jsx';
import FilterChips from '../input/FilterChips.jsx';

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

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {/*{numSelected > 0 ? (*/}
      {/*  <Typography className={classes.title} color="inherit" variant="subtitle1">*/}
      {/*    {numSelected}*/}
      {/*    selected*/}
      {/*  </Typography>*/}
      {/*) : (*/}
      {/*  <Typography className={classes.title} variant="h6" id="tableTitle" />*/}
      {/*)}*/}

      {/*{numSelected > 0 ? (*/}
      {/*  <Tooltip title="Delete">*/}
      {/*    <IconButton aria-label="delete">*/}
      {/*      <DeleteIcon />*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*) : (*/}
      {/*  <Tooltip title="Filter list">*/}
      {/*    <IconButton aria-label="filter list">*/}
      {/*      <Filters />*/}
      {/*    </IconButton>*/}
      {/*  </Tooltip>*/}
      {/*)}*/}

      <div className={classes.filters}>
        <Filters />
        <FilterChips />
      </div>

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
