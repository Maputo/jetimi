import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Gender from '../../../../utils/GenderConstants.js';
import Radio from '@material-ui/core/Radio';

const useStylesAvatar = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(30),
    height: theme.spacing(30),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.50, 2),
      minWidth: 300,
    },
    '& .MuiTextField-multiline': {
      fontSize: 7,
    },
  },
  formControl: {
    margin: theme.spacing(0.5, 2),
  },
  buttons: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: theme.spacing(2, 2),

    '& > *': {
      width: 135,
      marginLeft: theme.spacing(2),
    },
  },
  cardContainer: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'row',
    margin: theme.spacing(2, 2),
    flexWrap: 'wrap',
  },
  card: {
    maxWidth: 500,
    margin: 10,
  },
}));

export default function ProfilePage() {
  const classes = useStyles();
  const avatarClasses = useStylesAvatar();

  const [gender, setGender] = React.useState(Gender.m.id);
  const [sponsor, setSponsor] = React.useState(false);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleSponsorChange = (event) => {
    setSponsor(event.target.value === 'Da');
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <form noValidate autoComplete="off">
        <div className={classes.cardContainer}>
          <Paper className={classes.card} variant="elevation" elevation={0}>
            <div className={avatarClasses.root}>
              <Avatar alt="Jetimi Sandžaka" src="/logo.jpg" className={avatarClasses.large} />
            </div>
            <div>
              <TextField required id="name" label="Ime i prezime" />
              <TextField required id="address" label="Adresa" />
              <TextField required id="town" label="Grad" />
            </div>
          </Paper>

          <Paper className={classes.card} variant="elevation" elevation={0}>
            <TextField required id="date-of-birth" label="Datum rođenja" type="date"
                       InputLabelProps={{ shrink: true }} />
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
              <RadioGroup aria-label="gender" name="sponsor" value={sponsor ? 'Da' : 'Ne'}
                          onChange={handleSponsorChange}>
                <FormControlLabel value="Da" control={<Radio />} label="Da" />
                <FormControlLabel value="Ne" control={<Radio />} label="Ne" />
              </RadioGroup>
            </FormControl>
            <TextField
              id="additionalInfo"
              label="Dodatne informacije"
              multiline
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
          </Paper>
        </div>
      </form>
    </div>
  );
}
