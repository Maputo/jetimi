import React from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'underscore';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Gender from '../../../../utils/GenderConstants.js';
import Filler from '../../components/atoms/Filler.jsx';
import BottomAppBar from '../../components/molecules/BottomAppBar.jsx';
import { EMPTY_OBJECT, NOOP } from '../../../../utils/DefaultProps.js';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
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
  rootAvatar: {
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
});

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.protege, prevState) && !prevState.editing) {
      return { ...nextProps.protege, editing: prevState.editing };
    }

    return prevState;
  }

  render() {
    const { props, state } = this;
    const { classes, onUpdate } = props;
    const { editing } = state;

    const onEditCallback = () => {
      if (!editing) {
        return () => this.setState({
          editing: true,
        });
      }

      return null;
    };

    const onConfirmCallback = () => {
      if (editing) {
        return () => {
          onUpdate(state.id, state);

          this.setState({
            editing: false,
          });
        };
      }

      return null;
    };

    const onCancelCallback = () => {
      if (editing) {
        return () => this.setState({
          editing: false,
          ...props.protege,
        });
      }

      return null;
    };

    const handleChange = (field) => (event) => {
      this.setState({ [field]: event.target.value });
    };

    const renderForm = () => {
      if (state.id) {
        return (
          <form noValidate autoComplete="off">
            <div className={classes.cardContainer}>
              <Paper className={classes.card} variant="elevation" elevation={0}>
                <div className={classes.rootAvatar}>
                  <Avatar alt="Jetimi Sandžaka" src="/logo.jpg" className={classes.large} />
                </div>
                <div>
                  <TextField
                    className={classes.text}
                    id="name"
                    label="Ime i prezime"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !editing }}
                    value={state.name}
                    onChange={handleChange('name')}
                  />
                  <TextField
                    className={classes.text}
                    id="address"
                    label="Adresa"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !editing }}
                    value={state.address}
                    onChange={handleChange('address')}
                  />
                  <TextField
                    className={classes.text}
                    id="town"
                    label="Grad"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ readOnly: !editing }}
                    value={state.town}
                    onChange={handleChange('town')}
                  />
                </div>
              </Paper>

              <Paper className={classes.card} variant="elevation" elevation={0}>
                <TextField
                  className={classes.text}
                  id="date-of-birth"
                  label="Datum rođenja"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !editing }}
                  value={state.dateOfBirth}
                  onChange={handleChange('dateOfBirth')}
                />
                <TextField
                  className={classes.text}
                  id="join-date"
                  label="Datum pristupa"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !editing }}
                  value={state.joinDate}
                  onChange={handleChange('joinDate')}
                />
                <div className={classes.text}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Pol</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="gender"
                        value={state.gender}
                        onChange={handleChange('gender')}
                      >
                        <FormControlLabel
                          disabled={!editing}
                          value={Gender.m.id}
                          control={<Radio />}
                          label={Gender.m.label}
                        />
                        <FormControlLabel
                          disabled={!editing}
                          value={Gender.f.id}
                          control={<Radio />}
                          label={Gender.f.label}
                        />
                      </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Ima sponzora</FormLabel>
                      <RadioGroup
                        aria-label="gender"
                        name="sponsor"
                        value={state.sponsor}
                        onChange={handleChange('sponsor')}
                      >
                        <FormControlLabel
                          disabled={!editing}
                          value="Da"
                          control={<Radio />}
                          label="Da"
                        />
                        <FormControlLabel
                          disabled={!editing}
                          value="Ne"
                          control={<Radio />}
                          label="Ne"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
                <TextField
                  id="additionalInfo"
                  label="Dodatne informacije"
                  multiline
                  variant="filled"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ readOnly: !editing }}
                  value={state.text}
                  onChange={handleChange('text')}
                />
              </Paper>
            </div>
            <Filler />
          </form>
        );
      }

      return null;
    };

    return (
      <div className={classes.root}>
        <CssBaseline />
        {renderForm()}
        <BottomAppBar
          onEdit={onEditCallback()}
          onCancel={onCancelCallback()}
          onConfirm={onConfirmCallback()}
        />
      </div>
    );
  }
}

export default withStyles(styles)(ProfilePage);

ProfilePage.propTypes = {
  protege: PropTypes.object,
  classes: PropTypes.object,
  onUpdate: PropTypes.func,
};

ProfilePage.defaultProps = {
  protege: EMPTY_OBJECT,
  classes: EMPTY_OBJECT,
  onUpdate: NOOP,
};
