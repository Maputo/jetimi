import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    marginBottom: theme.spacing(7),
  },
}));

const Filler = () => {
  const classes = useStyles();

  return (
    <div className={classes.root} />
  );
};

export default Filler;
