import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import TransitionalModal from '../atoms/TransitionalModal.jsx';
import Gender from '../../../../utils/GenderConstants.js';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles();
const AddProtege = (props) => {
  const classes = useStyles();
  const [gender, setGender] = React.useState(Gender.m.id);
  const [sponsor, setSponsor] = React.useState(false);
  const { open, onModalClose } = props;

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSponsorChange = (event) => {
    setSponsor(event.target.value === 'Da');
  };

  return (
    <TransitionalModal open={open} onClose={onModalClose}>
      <CssBaseline />
      <h2>Dodaj jetima</h2>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField required id="name" label="Ime i prezime" />
        <TextField required id="address" label="Adresa" />
        <TextField required id="town" label="Grad" />
        <TextField required id="date-of-birth" label="Datum rođenja" type="date" InputLabelProps={{ shrink: true }} />
        <TextField id="join-date" label="Datum pristupa" type="date" InputLabelProps={{ shrink: true }} />
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Pol</FormLabel>
          <RadioGroup aria-label="gender" name="gender" value={gender} onChange={handleGenderChange}>
            <FormControlLabel value={Gender.m.id} control={<Radio />} label={Gender.m.label} />
            <FormControlLabel value={Gender.f.id} control={<Radio />} label={Gender.f.label} />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Ima sponzora</FormLabel>
          <RadioGroup aria-label="gender" name="sponsor" value={sponsor ? 'Da' : 'Ne'} onChange={handleSponsorChange}>
            <FormControlLabel value="Da" control={<Radio />} label="Da" />
            <FormControlLabel value="Ne" control={<Radio />} label="Ne" />
          </RadioGroup>
        </FormControl>
        <TextField
          id="additionalInfo"
          label="Dodatne informacije"
          multiline
          rows="4"
          variant="filled"
        />
        <div className={classes.buttons}>
          <Button variant="outlined" color="default">
            Odustani
          </Button>
          <Button variant="contained" color="primary">
            Potvrdi
          </Button>
        </div>
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
