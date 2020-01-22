import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  fabContainer: {
    position: 'absolute',
    zIndex: 1,
    top: -15,
    left: 0,
    right: 0,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  fabButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default function BottomAppBar(props) {
  const classes = useStyles();
  const { onAdd, onEdit, onCancel, onConfirm } = props;

  const renderAddIcon = () => {
    if (onAdd) {
      return (
        <Fab color="secondary" aria-label="add" className={classes.fabButton}>
          <AddIcon onClick={onAdd} />
        </Fab>
      );
    }

    return null;
  };

  const renderEditIcon = () => {
    if (onEdit) {
      return (
        <Fab color="secondary" aria-label="edit" className={classes.fabButton}>
          <EditIcon onClick={onEdit} />
        </Fab>
      );
    }

    return null;
  };

  const renderCancelIcon = () => {
    if (onCancel) {
      return (
        <Fab color="secondary" aria-label="edit" className={classes.fabButton}>
          <CloseIcon onClick={onCancel} />
        </Fab>
      );
    }

    return null;
  };

  const renderConfirmIcon = () => {
    if (onConfirm) {
      return (
        <Fab color="secondary" aria-label="edit" className={classes.fabButton}>
          <CheckIcon onClick={onConfirm} />
        </Fab>
      );
    }

    return null;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <div className={classes.fabContainer}>
            {renderAddIcon()}
            {renderEditIcon()}
            {renderCancelIcon()}
            {renderConfirmIcon()}
          </div>

        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

BottomAppBar.propTypes = {
  onAdd: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

BottomAppBar.defaultProps = {
  onAdd: null,
  onEdit: null,
  onCancel: null,
  onConfirm: null,
};
