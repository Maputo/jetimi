import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FiltersAndChipsContainer from '../../containers/FiltersAndChipsContainer.jsx';
import BottomAppBar from '../../components/molecules/BottomAppBar.jsx';
import CustomTable from '../../components/atoms/CustomTable.jsx';
import { EMPTY_ARRAY, EMPTY_OBJECT } from '../../../../utils/DefaultProps.js';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  filler: {
    height: theme.spacing(6),
  },
}));

const ProtegesPage = (props) => {
  const classes = useStyles();
  const { proteges = [], history } = props;

  const handleClick = (event, name) => { // eslint-disable-line no-unused-vars
    history.push('/p/profile');
  };

  return (
    <div className={classes.root}>
      <FiltersAndChipsContainer />
      <CustomTable entries={proteges} onRowClick={handleClick} />
      <div className={classes.filler} />
      <BottomAppBar />
    </div>
  );
};

ProtegesPage.propTypes = {
  history: PropTypes.object,
  proteges: PropTypes.array,
};

ProtegesPage.defaultProps = {
  history: EMPTY_OBJECT,
  proteges: EMPTY_ARRAY,
};

export default withRouter(ProtegesPage);
