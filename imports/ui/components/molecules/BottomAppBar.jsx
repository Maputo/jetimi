import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles();
  const { onAdd } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <Fab color="secondary" aria-label="add" className={classes.fabButton}>
            <AddIcon onClick={onAdd} />
          </Fab>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  onAdd: PropTypes.func.isRequired,
};
