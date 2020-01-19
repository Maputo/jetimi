import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TransitionalModal from '../atoms/TransitionalModal.jsx';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.25),
    },
  },
}));

const AddProtege = (props) => {
  const classes = useStyles();
  const { open, onModalClose } = props;

  return (
    <TransitionalModal open={open} onClose={onModalClose}>
      <h2>Dodaj jetima</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="name" label="Ime i prezime" />
        <TextField required id="address" label="Adresa" />
        <TextField required id="town" label="Grad" />
      </form>
    </TransitionalModal>
  );
};

export default AddProtege;

AddProtege.propTypes = {
  open: PropTypes.bool,
  onModalClose: PropTypes.func.isRequired,
};

AddProtege.defaultProps = {
  open: false,
};
