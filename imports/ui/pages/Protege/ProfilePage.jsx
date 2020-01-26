import React from 'react';
import PropTypes from 'prop-types';
import { forEach, isEqual, property } from 'underscore';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Gender from '../../../../utils/GenderConstants.js';
import Filler from '../../components/atoms/Filler.jsx';
import BottomAppBar from '../../components/molecules/BottomAppBar.jsx';
import { EMPTY_ARRAY, EMPTY_OBJECT, NOOP } from '../../../../utils/DefaultProps.js';

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

const separateChangedFields = (newObj, origObj) => {
  const diffObject = {};
  forEach(origObj, (value, key) => {
    if (newObj[key] !== value) {
      diffObject[key] = newObj[key];
    }
  });

  return diffObject;
};

const processAddressAndTownFields = (diff, refAddress, refTown, state) => {
  const { address, town, townId } = state;

  // address and town were input (not selected from autoselect)
  // autoselect selections are covered in separateChangedFields
  if ((refAddress && (address !== refAddress)) && (refTown && (town !== refTown))) {
    diff.address = refAddress;
    diff.addressId = null;
    diff.town = refTown;
    diff.townId = null;

    // address was input but town is the same
  } else if (refAddress && (address !== refAddress) && (refTown === town)) {
    diff.address = refAddress;
    diff.addressId = null;
    diff.town = refTown;
    diff.townId = townId;

    // address was selected but town was input (address is treated as input)
  } else if ((refTown && (town !== refTown) && (refAddress === address))) {
    diff.address = refAddress;
    diff.addressId = null;
    diff.town = refTown;
    diff.townId = null;

    // town was changed but address is the same
  } else if (diff.town && !diff.address) {
    diff.address = refAddress;
    diff.addressId = null;
  }
};

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.addressRef = React.createRef();
    this.townRef = React.createRef();
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
    const { editing } = state;
    const { classes, onUpdate } = props;

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
          const diff = separateChangedFields(state, props.protege);

          const refAddress = property(['addressRef', 'current', 'value'])(this);
          const refTown = property(['townRef', 'current', 'value'])(this);
          processAddressAndTownFields(diff, refAddress, refTown, state);

          onUpdate(state.id, diff);

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

    // workaround for entering new address, due to an Autocomplete bug
    const handleAutocompleteChange = (field) => (event, value) => {
      if (typeof value === 'string' || value instanceof String) {
        this.setState({ [field]: value });
      } else {
        const fieldId = `${field}Id`;
        this.setState({ [field]: value.text, [fieldId]: value.value });
      }
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
                    InputProps={{ readOnly: !editing }}
                    value={state.name}
                    onChange={handleChange('name')}
                  />
                  <Autocomplete
                    id="address"
                    freeSolo
                    autoHighlight
                    disableClearable
                    disabled={!editing}
                    options={props.addresses}
                    getOptionLabel={(option) => option.text}
                    getOptionSelected={(option, value) => option.text === value.text}
                    value={{ text: state.address }}
                    onChange={handleAutocompleteChange('address')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={classes.text}
                        label="Adresa"
                        margin="normal"
                        fullWidth
                        inputRef={this.addressRef}
                      />
                    )}
                  />
                  <Autocomplete
                    id="town"
                    freeSolo
                    autoHighlight
                    disableClearable
                    disabled={!editing}
                    options={props.towns}
                    getOptionLabel={(option) => option.text}
                    getOptionSelected={(option, value) => option.text === value.text}
                    value={{ text: state.town }}
                    onChange={handleAutocompleteChange('town')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className={classes.text}
                        label="Town"
                        margin="normal"
                        fullWidth
                        inputRef={this.townRef}
                      />
                    )}
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
  addresses: PropTypes.array,
  towns: PropTypes.array,
  onUpdate: PropTypes.func,
};

ProfilePage.defaultProps = {
  protege: EMPTY_OBJECT,
  classes: EMPTY_OBJECT,
  addresses: EMPTY_ARRAY,
  towns: EMPTY_ARRAY,
  onUpdate: NOOP,
};
