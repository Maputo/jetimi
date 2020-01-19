import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { EMPTY_ARRAY, NOOP } from '../../../../utils/DefaultProps';

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

  const handleDelete = (chip) => () => {
    props.onDelete(chip);
  };

  return (
    <div className={classes.root}>
      {chips.map((chip) => {
        return (
          <Chip
            key={chip.id}
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
  onDelete: PropTypes.func,
};

Chips.defaultProps = {
  chips: EMPTY_ARRAY,
  onDelete: NOOP,
};

export default Chips;
