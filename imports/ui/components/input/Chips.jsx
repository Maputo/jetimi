import React from 'react';
import PropTypes from 'prop-types';
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

const Chips = (props) => {
  const classes = useStyles();
  const { chips } = props;

  const handleDelete = (chipToDelete) => () => {
    // setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

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

Chips.propTypes = {
  chips: PropTypes.array,
};

export default Chips;
