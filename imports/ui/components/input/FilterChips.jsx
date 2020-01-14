import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.5),
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

//
// const [chipData, setChipData] = React.useState([
//   { key: 0, label: 'Angular' },
//   { key: 1, label: 'jQuery' },
//   { key: 2, label: 'Polymer' },
//   { key: 3, label: 'React' },
//   { key: 4, label: 'Vue.js' },
// ]);

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

const FilterChips = (props) => {
  const classes = useStyles();
  const { location } = props;

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
console.log("rendering through", location.search);
  const chips = getChipsFromParams(location.search);

  return (
    <div className={classes.root}>
      {chips.map((chip) => {
        return (
          <Chip
            key={chip.key}
            label={chip.label}
            onDelete={handleDelete(chip)}
            className={classes.chip}
          />
        );
      })}
    </div>
  );
};

export default withRouter(FilterChips);
