import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import FiltersAndChipsContainer from '../../containers/FiltersAndChipsContainer.jsx';
import BottomAppBar from '../../components/molecules/BottomAppBar.jsx';
import CustomTable from '../../components/atoms/CustomTable.jsx';
import AddProtege from '../../components/organisms/AddProtege.jsx';
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
  const [open, setOpen] = React.useState(false);

  const handleClick = (event, name) => { // eslint-disable-line no-unused-vars
    history.push('/p/profile');
  };

  const onModalClose = () => {
    setOpen(false);
  };

  const bottomBarAddClick = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <FiltersAndChipsContainer />
      <CustomTable entries={proteges} onRowClick={handleClick} />
      <div className={classes.filler} />
      <BottomAppBar onAdd={bottomBarAddClick} />
      <AddProtege open={open} onModalClose={onModalClose} />
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
