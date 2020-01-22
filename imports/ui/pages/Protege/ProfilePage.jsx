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
import Radio from '@material-ui/core/Radio';
import Gender from '../../../../utils/GenderConstants.js';

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
    width: theme.spacing(40),
    height: theme.spacing(40),
  },
}));

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    margin: 0,
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiTextField-root': {
      marginLeft: theme.spacing(1),
      marginTop: theme.spacing(1),
      width: '95%',
    },
    '& .MuiTextField-multiline': {
      fontSize: 7,
      width: '100%',
    },
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  formControl: {
    margin: theme.spacing(1, 2),
  },
  text: {
    display: 'block',
  },
  buttons: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: theme.spacing(2),

    '& > *': {
      width: 'auto',
      marginLeft: theme.spacing(2),
    },
  },
  cardContainer: {
    display: 'flex',
    flex: '1 1 100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    padding: theme.spacing(2),
    width: theme.spacing(45),
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
              <TextField className={classes.text} required id="name" label="Ime i prezime" />
              <TextField className={classes.text} required id="address" label="Adresa" />
              <TextField className={classes.text} required id="town" label="Grad" />
            </div>
          </Paper>

          <Paper className={classes.card} variant="elevation" elevation={0}>
            <TextField className={classes.text} required id="date-of-birth" label="Datum rođenja" type="date" InputLabelProps={{ shrink: true }} />
            <TextField className={classes.text} id="join-date" label="Datum pristupa" type="date" InputLabelProps={{ shrink: true }} />
            <div className={classes.text}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
              </div>
            </div>
            <TextField
              id="additionalInfo"
              label="Dodatne informacije"
              multiline
              variant="filled"
            />
            {/*<div className={classes.buttons}>*/}
            {/*  <Button variant="outlined" color="default">*/}
            {/*    Odustani*/}
            {/*  </Button>*/}
            {/*  <Button variant="contained" color="primary">*/}
            {/*    Potvrdi*/}
            {/*  </Button>*/}
            {/*</div>*/}
          </Paper>
        </div>
      </form>
    </div>
  );
}
