import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 125,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const NativeSelects = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    town: '',
    name: 'hai',
  });

  const { label, id, options } = props;

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor={`outlined-${id}-native-simple`}>
          {label}
        </InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange('town')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: `outlined-${id}-native-simple`,
          }}
        >
          <option value="" aria-label="empty" />
          {options.map((opt) => (<option key={opt.value} value={opt.value}>{opt.text}</option>))}
        </Select>
      </FormControl>
    </div>
  );
};

export default NativeSelects;

NativeSelects.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};
